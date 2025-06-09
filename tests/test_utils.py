import asyncio
import logging
import types
import pytest
from browser_use import utils

def test_time_execution_sync_logs_and_returns(monkeypatch, caplog):
    calls = {}

    @utils.time_execution_sync("TestSync")
    def f(x, y):
        calls['called'] = True
        return x + y

    with caplog.at_level(logging.DEBUG):
        result = f(2, 3)

    assert result == 5
    assert calls['called']
    assert any("TestSync Execution time:" in m for m in caplog.messages)

@pytest.mark.asyncio
async def test_time_execution_async_logs_and_returns(caplog):
    calls = {}

    @utils.time_execution_async("TestAsync")
    async def f(x, y):
        calls['called'] = True
        await asyncio.sleep(0.01)
        return x * y

    with caplog.at_level(logging.DEBUG):
        result = await f(4, 5)

    assert result == 20
    assert calls['called']
    assert any("TestAsync Execution time:" in m for m in caplog.messages)

def test_singleton_enforces_single_instance():
    @utils.singleton
    class Foo:
        def __init__(self, x):
            self.x = x

    a = Foo(10)
    b = Foo(20)

    assert a is b
    assert a.x == 10
    assert b.x == 10  # Singleton: second init does not overwrite

def test_singleton_allows_methods():
    @utils.singleton
    class Bar:
        def __init__(self, y):
            self.y = y
        def add(self, z):
            return self.y + z

    b1 = Bar(7)
    assert b1.add(3) == 10
    b2 = Bar(100)
    assert b2.add(1) == 8  # Singleton: .y remains 7 from first init
    assert b1 is b2