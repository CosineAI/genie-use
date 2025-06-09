import time
import pytest

from browser_use.utils import time_execution_sync, time_execution_async

def test_time_execution_sync_decorator(monkeypatch):
    times = [0, 1]  # Will simulate 1s elapsed
    def fake_time():
        return times.pop(0)

    monkeypatch.setattr(time, "time", fake_time)

    @time_execution_sync("SYNC")
    def add(x, y):
        return x + y

    result = add(2, 3)
    assert result == 5
    assert add.__name__ == "add"

@pytest.mark.asyncio
async def test_time_execution_async_decorator(monkeypatch):
    times = [0, 1]  # Will simulate 1s elapsed
    def fake_time():
        return times.pop(0)

    monkeypatch.setattr(time, "time", fake_time)

    @time_execution_async("ASYNC")
    async def multiply(x, y):
        return x * y

    result = await multiply(4, 5)
    assert result == 20
    assert multiply.__name__ == "multiply"