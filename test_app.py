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

def test_calculate_average_change1():
    """tests if from given numbers test comes back with correct %"""
    assert app.calculate_average_change({'EUR_CZK': {'2022-05-12': 100, '2022-05-13': 100, '2022-05-14': 200}}) == 50.0

def test_calculate_average_change2():
    """tests if from given numbers test comes back with correct %"""
    assert app.calculate_average_change({'EUR_CZK': {'2022-05-12': 100, '2022-05-13': 100, '2022-05-14': 100}}) == 0.0

def test_calculate_average_change3():
    """tests if from given numbers test comes back with correct %"""
    assert app.calculate_average_change({'EUR_CZK': {'2022-05-12': 100, '2022-05-13': 100, '2022-05-14': 0}}) == -100.0

def test_get_reccomendation_buy():
    """Checks if not selected to process info if it returns Null Null"""
    assert app.get_recommendation_buy("0") == ("Null", "Null")