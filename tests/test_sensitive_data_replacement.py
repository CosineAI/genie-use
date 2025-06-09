import pytest
from pydantic import BaseModel, Field
from typing import Any, Dict, List
from browser_use.controller.registry.service import Registry

class DummyModel(BaseModel):
    text: str

class NestedModel(BaseModel):
    meta: Dict[str, Any]
    items: List[Any]

@pytest.fixture
def registry():
    # The Registry class likely has a public interface, but for these tests we only need _replace_sensitive_data.
    # We'll instantiate it directly. If Registry requires arguments, adjust as necessary.
    return Registry()

def test_simple_replacement(registry):
    sensitive_data = {"password": "hunter2"}
    model = DummyModel(text="my pass is <secret>password</secret>")
    replaced = registry._replace_sensitive_data(model, sensitive_data)
    assert isinstance(replaced, DummyModel)
    assert replaced.text == "my pass is hunter2"

def test_nested_structures(registry):
    sensitive_data = {
        "token": "XYZ123",
        "email": "user@example.com"
    }
    model = NestedModel(
        meta={
            "auth": "<secret>token</secret>",
            "profile": {
                "email": "<secret>email</secret>"
            }
        },
        items=[
            "plain",
            "<secret>token</secret>",
            {"deep": "<secret>email</secret>"}
        ]
    )
    replaced = registry._replace_sensitive_data(model, sensitive_data)
    # Check replacements in nested dicts/lists
    assert replaced.meta["auth"] == "XYZ123"
    assert replaced.meta["profile"]["email"] == "user@example.com"
    assert replaced.items[0] == "plain"
    assert replaced.items[1] == "XYZ123"
    assert replaced.items[2]["deep"] == "user@example.com"

def test_missing_placeholder(registry):
    sensitive_data = {}
    model = DummyModel(text="keep <secret>notset</secret> as is")
    replaced = registry._replace_sensitive_data(model, sensitive_data)
    assert replaced.text == "keep <secret>notset</secret> as is"

def test_return_type_and_integrity(registry):
    sensitive_data = {"foo": "bar"}
    model = DummyModel(text="no secrets here")
    replaced = registry._replace_sensitive_data(model, sensitive_data)
    assert isinstance(replaced, DummyModel)
    # Unchanged values remain untouched
    assert replaced.text == "no secrets here"
    # The returned object should be a model of the same type and not a dict
    assert type(replaced) is DummyModel