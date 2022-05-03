import app
from datetime import datetime


def test_get_time():
    """ test TRUE statement"""
    assert app.get_time("1")[-6] == str(datetime.now())[-6]


def test_get_time2():
    """test FALSE statement"""
    assert app.get_time("nothing new") is "Null"


def test_get_name():
    """tests FALSE statement"""
    assert app.get_name("nothing really") is "Null"


def test_get_name2():
    """tests TRUE statement"""
    assert app.get_name("1") == "appBot"
