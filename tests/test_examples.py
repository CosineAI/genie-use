import pytest
import os

def test_examples_directory_exists():
    """
    Test that the examples directory exists.
    """
    assert os.path.isdir("examples")