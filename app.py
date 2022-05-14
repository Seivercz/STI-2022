from flask import Flask, jsonify
from datetime import datetime, timedelta
from flask import request
import requests

app = Flask(__name__)


def get_time(time_bool):
    """From given string 1 == True returns datetime or Null"""
    if time_bool == "1":
        return str(datetime.now())
    return "Null"


def get_name(name_bool):
    """From given string 1 == True returns name of backend or Null """
    if name_bool == "1":
        return "appBot"
    return "Null"


def get_exchange_rate(rate_bool):
    """Gets exchange rate from API, if failed or not wanted to give rate then return Null"""
    if rate_bool == "1":
        exchange_rate_name = "EUR_CZK"
        api_key = "ffdcf3c57840096bf1a0"
        # url_query = "/api/v7/convert?q={}&compact=ultra&apiKey=".format(exchange_rate_name)
        url_query = f"/api/v7/convert?q={exchange_rate_name}&compact=ultra&apiKey="
        url = "https://free.currconv.com"
        # api_request = "{}{}{}".format(url, url_query, api_key)
        api_request = f"{url}{url_query}{api_key}"
        response = requests.get(api_request)
        if response and response.status_code == 200:
            data = response.json()
            return str(data[exchange_rate_name])
    return "Null"


def calculate_rate_lowering(data):
    """From given data in dict returns whether elements are lower than other ones with 1 or 0 when one element is higher or equal value"""
    czk_eur_data = data["EUR_CZK"]
    biggest_element = 10000

    for key, value in czk_eur_data.items():
        if value >= biggest_element:
            return {False: (value - biggest_element)}
        biggest_element = value
    return {True: (next(iter(czk_eur_data.values())) - biggest_element)}


def calculate_average_change(data):
    """From given data in dict returns whether change in elements is higher or lower than 10%"""
    czk_eur_data = data["EUR_CZK"]
    sum_of_vals = 0
    for key, value in czk_eur_data.items():
        sum_of_vals += value

    average_sum_of_vals = sum_of_vals / 3
    change = ((list(czk_eur_data.values())[-1] / average_sum_of_vals) * 100) - 100
    return change


def check_limit_average_change(change):
    return {True: change} if change < 10 else {False: change}


def process_data(data):
    lowering_rate = calculate_rate_lowering(data)
    average_change = check_limit_average_change(calculate_average_change(data))
    return lowering_rate, average_change


def get_recommendation_buy(reccomendation_bool):
    if reccomendation_bool == "0":
        return "Null", "Null"
    date_start = datetime.now()
    date_end = date_start - timedelta(days=2)
    exchange_rate_name = "EUR_CZK"
    date_start_formatted = f"{date_start.year:04d}-{date_start.month:02d}-{date_start.day:02d}"
    date_end_formatted = f"{date_end.year:04d}-{date_end.month:02d}-{date_end.day:02d}"
    api_key = "ffdcf3c57840096bf1a0"
    # url_query = "/api/v7/convert?q={}&compact=ultra&apiKey=".format(exchange_rate_name)
    url = "https://free.currconv.com"
    url_query = f"/api/v7/convert?q={exchange_rate_name}&compact=ultra&date={date_end_formatted}&endDate={date_start_formatted}&apiKey={api_key}"
    api_request = f"{url}{url_query}"
    response = requests.get(api_request)

    if response and response.status_code == 200:
        return process_data(response.json())



@app.route("/api/getData", methods=["GET"])
def get_data():
    """url for test: http://127.0.0.1:5000/api/getData?time=1&name=1&exchangeRate=0&buyRecomendation=1"""
    time_bool = get_time(request.args.get("time"))
    name_bool = get_name((request.args.get("name")))
    rate_bool = get_exchange_rate(request.args.get("exchangeRate"))
    is_buy_recommended1, is_buy_recommended2 = get_recommendation_buy("buyRecomendation")
    response = jsonify(
        {"time": time_bool, "name": name_bool, "rate": rate_bool, "lower_reccomended": str(is_buy_recommended1), "average_reccomended": str(is_buy_recommended2)})

    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == '__main__':
    app.run()
