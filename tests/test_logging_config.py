import logging
import os
import pytest

from browser_use.logging_config import addLoggingLevel, setup_logging

def test_addLoggingLevel_adds_and_prevents_duplicates():
    # Add a custom level
    level_name = "TRACE"
    level_num = logging.DEBUG - 5

    # Cleanup if already present (for repeatable tests)
    if hasattr(logging, level_name):
        delattr(logging, level_name)
    if hasattr(logging, "trace"):
        delattr(logging, "trace")
    if hasattr(logging.getLoggerClass(), "trace"):
        delattr(logging.getLoggerClass(), "trace")

    addLoggingLevel(level_name, level_num)
    assert hasattr(logging, level_name)
    assert hasattr(logging, "trace")
    assert hasattr(logging.getLoggerClass(), "trace")
    assert getattr(logging, level_name) == level_num

    # Adding again should raise
    with pytest.raises(AttributeError):
        addLoggingLevel(level_name, level_num)

def test_new_log_level_works(caplog):
    # Ensure TRACE is present
    if not hasattr(logging, "TRACE"):
        addLoggingLevel("TRACE", logging.DEBUG - 5)
    logger = logging.getLogger("browser_use.test")
    with caplog.at_level("TRACE"):
        logger.trace("trace message!")
    assert any("trace message!" in m for m in caplog.messages)

def test_setup_logging_sets_format_and_level(monkeypatch, caplog):
    # Clean up root handlers for test isolation
    root = logging.getLogger()
    root.handlers = []

    monkeypatch.setenv('BROWSER_USE_LOGGING_LEVEL', 'debug')
    # Run setup_logging (should not raise)
    setup_logging()

    logger = logging.getLogger('browser_use')
    logger.debug("debug message")
    logger.info("info message")

    # Should see both debug and info
    assert any("debug message" in m for m in caplog.messages)
    assert any("info message" in m for m in caplog.messages)

def test_setup_logging_idempotence(monkeypatch):
    # Remove all handlers for root
    root = logging.getLogger()
    root.handlers = []
    monkeypatch.setenv('BROWSER_USE_LOGGING_LEVEL', 'info')
    setup_logging()
    handlers_before = list(root.handlers)
    setup_logging()
    handlers_after = list(root.handlers)
    assert handlers_before == handlers_after  # No duplicate handlers

def test_third_party_loggers_are_silenced():
    setup_logging()
    noisy = logging.getLogger('httpx')
    assert noisy.level == logging.ERROR
    assert not noisy.propagate