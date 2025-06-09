import pytest
from pydantic import BaseModel, Field, create_model

from browser_use.controller.registry.views import ActionModel, ActionRegistry, RegisteredAction

def make_test_action_model(index_val=3):
    # Dynamically create a minimal Pydantic param model with an index field
    TestParams = create_model(
        "TestParams",
        index=(int, Field(default=index_val)),
        __base__=BaseModel
    )
    # Dynamically create a subclass of ActionModel with a single action field
    TestActionModel = create_model(
        "TestActionModel",
        test_action=(TestParams, ...),
        __base__=ActionModel
    )
    return TestActionModel, TestParams

def test_get_index_and_set_index():
    TestActionModel, TestParams = make_test_action_model()
    # Instantiate with index=3
    model = TestActionModel(test_action=TestParams(index=3))
    assert model.get_index() == 3

    # Change index via set_index
    model.set_index(7)
    assert model.test_action.index == 7
    assert model.get_index() == 7

def test_action_registry_get_prompt_description():
    # Minimal param model
    TestParams = create_model(
        "TestParams",
        foo=(str, Field(default="bar")),
        __base__=BaseModel
    )
    # Minimal RegisteredAction
    reg_action = RegisteredAction(
        name="foo_action",
        description="Do foo things",
        function=lambda: None,
        param_model=TestParams
    )
    registry = ActionRegistry(actions={"foo_action": reg_action})
    desc = registry.get_prompt_description()
    assert isinstance(desc, str)
    assert desc
    assert "Do foo things" in desc
    assert "foo_action" in desc