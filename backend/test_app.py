import app
from datetime import datetime


def test_get_time():
    """ test TRUE statement"""
    assert app.get_time("1") == str(datetime.now())


def test_get_time():
    """test FALSE statement"""
    assert app.get_time("nothing new") == "Null"
