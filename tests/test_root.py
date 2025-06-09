def test_project_root_files():
    """
    Basic sanity test to ensure the project root contains expected files.
    """
    import os
    for fname in [".env.example", "README.md", "pytest.ini"]:
        assert os.path.isfile(fname)