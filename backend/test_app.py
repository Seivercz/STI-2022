import app
from datetime import datetime


def test_get_time():
    """ test TRUE statement"""
    assert app.get_time("1") == str(datetime.now())


def test_get_time2():
    """test FALSE statement"""
    assert app.get_time("nothing new") == "Null"


def test_get_name():
    """tests FALSE statement"""
    assert app.get_name("nothing really") == "Null"


def test_get_name2():
    """tests TRUE statement"""
    assert app.get_name("1") == "appBot"
