from flask import Flask
from datetime import datetime
from flask import request
import requests

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World'



def get_time(time_bool):
    """From given string 1 == True returns datetime or nothing"""
    if time_bool == "1":
        return str(datetime.now())
    return "Null"


def get_name(name_bool):
    if name_bool == "1":
        return "appBot"
    return "Null"


def get_exchange_rate(rate_bool):
    if rate_bool == "1":
        exchange_rate_name = "EUR_CZK"
        api_key = "ffdcf3c57840096bf1a0"
        url_query = "/api/v7/convert?q={}&compact=ultra&apiKey=".format(exchange_rate_name)
        url = "https://free.currconv.com"
        api_request = "{}{}{}".format(url, url_query, api_key)
        response = requests.get(api_request)
        if response and response.status_code == 200:
            data = response.json()
            return str(data[exchange_rate_name])
    return "Null"


@app.route("/api/getData")
def get_data():
    "url for test: http://127.0.0.1:5000/api/getData?time=1&name=1&exchangeRate=0"
    time_bool = str(request.args.get("time"))
    name_bool = str(request.args.get("name"))
    rate_bool = str(request.args.get("exchangerate"))

    return str(get_time(time_bool) + ";" + get_name(name_bool) + ";" + get_exchange_rate(rate_bool))


if __name__ == '__main__':
    app.run()
