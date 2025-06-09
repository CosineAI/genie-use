import pytest
import inspect
import asyncio

from browser_use.controller.registry.service import Registry

@pytest.fixture
def registry():
    return Registry()

def test_action_wraps_sync_to_async(registry):
    result_holder = {}

    def add(a: int, b: int) -> int:
        return a + b

    wrapped = registry.action(add)
    assert inspect.iscoroutinefunction(wrapped)

    # The wrapper should be awaitable and return correct result
    async def run():
        return await wrapped(2, 3)
    result = asyncio.run(run())
    assert result == 5