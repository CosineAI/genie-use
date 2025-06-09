import asyncio
import sys
import types
import pytest

import eval.gpt-4o as gpt4o

from unittest.mock import AsyncMock, patch, MagicMock

@pytest.mark.asyncio
async def test_run_agent_happy_path(monkeypatch):
    """Test that run_agent returns result and history as tuple for a simple task."""

    # Patch ChatOpenAI and Agent
    mock_llm = MagicMock()
    mock_agent_instance = MagicMock()
    mock_result = MagicMock()
    mock_result.history = ["step1", "step2"]

    # Make agent.run return the mock result
    mock_agent_instance.run = AsyncMock(return_value=mock_result)
    mock_agent_cls = MagicMock(return_value=mock_agent_instance)

    with patch.object(gpt4o, "ChatOpenAI", return_value=mock_llm):
        with patch.object(gpt4o, "Agent", mock_agent_cls):
            result, history = await gpt4o.run_agent("dummy task", max_steps=3)

    assert result == mock_result
    assert history == ["step1", "step2"]
    mock_agent_cls.assert_called_once()
    mock_agent_instance.run.assert_awaited_once_with(max_steps=3)

@pytest.mark.asyncio
async def test_run_agent_propagates_agent_exception(monkeypatch):
    """Test that run_agent propagates exceptions from agent.run()."""

    mock_llm = MagicMock()
    mock_agent_instance = MagicMock()
    mock_agent_instance.run = AsyncMock(side_effect=RuntimeError("agent failed"))
    mock_agent_cls = MagicMock(return_value=mock_agent_instance)

    with patch.object(gpt4o, "ChatOpenAI", return_value=mock_llm):
        with patch.object(gpt4o, "Agent", mock_agent_cls):
            with pytest.raises(RuntimeError, match="agent failed"):
                await gpt4o.run_agent("fail task", max_steps=1)