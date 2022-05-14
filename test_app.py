import app
from datetime import datetime


def test_get_time():
    """ test TRUE statement"""
    assert app.get_time("1")[-6] == str(datetime.now())[-6]


def test_get_time2():
    """test FALSE statement"""
    assert app.get_time("nothing new") == "Null"


def test_get_name():
    """tests FALSE statement"""
    assert app.get_name("nothing really") == "Null"


def test_get_name2():
    """tests TRUE statement"""
    assert app.get_name("1") == "appBot"

def test_get_exchange_rate1():
    assert app.get_exchange_rate("0") == "Null"

def test_get_exchange_rate2():
    assert app.get_exchange_rate("1") != "Null"

def test_calculate_average_change1():
    """tests if from given numbers test comes back with correct %"""
    assert app.calculate_average_change({'EUR_CZK': {'2022-05-12': 100, '2022-05-13': 100, '2022-05-14': 200}}) == 50.0

def test_calculate_average_change2():
    """tests if from given numbers test comes back with correct %"""
    assert app.calculate_average_change({'EUR_CZK': {'2022-05-12': 100, '2022-05-13': 100, '2022-05-14': 100}}) == 0.0

def test_calculate_average_change3():
    """tests if from given numbers test comes back with correct %"""
    assert app.calculate_average_change({'EUR_CZK': {'2022-05-12': 100, '2022-05-13': 100, '2022-05-14': 0}}) == -100.0

def test_get_reccomendation_buy1():
    """Checks if not selected to process info if it returns Null Null"""
    assert app.get_recommendation_buy("0") == ("Null", "Null")

def test_calculate_rate_lowering1():
    data = {'EUR_CZK': {'2022-05-12': 1, '2022-05-13': 2, '2022-05-14': 3}}
    assert app.calculate_rate_lowering(data) == {False: 1}

def test_calculate_rate_lowering2():
    data = {'EUR_CZK': {'2022-05-12': 3, '2022-05-13': 2, '2022-05-14': 1}}
    assert app.calculate_rate_lowering(data) == {True: 2}

def test_calculate_rate_lowering3():
    data = {'EUR_CZK': {'2022-05-12': 10, '2022-05-13': 0, '2022-05-14': 5}}
    assert app.calculate_rate_lowering(data) == {False: 5}

def test_check_limit_average_change1():
    assert app.check_limit_average_change(20) == {False: 20}

def test_check_limit_average_change2():
    assert app.check_limit_average_change(-20) == {True: -20}

def test_process_data():
    assert app.process_data({'EUR_CZK': {'2022-05-12': 3, '2022-05-13': 2, '2022-05-14': 1}}) == ({True: 2}, {True: -50.0})