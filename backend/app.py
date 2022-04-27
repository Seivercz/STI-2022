from flask import Flask
from datetime import datetime
from flask import request
import requests
app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World'


@app.route("/api/getData")
def get_data():
    # TODO rozdělit do funkčních bloků pro napsání testů
    payload = ["Null", "Null", "Null"]
    req1 = request.args.get("time")
    req2 = request.args.get("name")
    req3 = request.args.get("exchangerate")
    #bool 0 == False, 1 == True
    if str(request.args.get("time")) == "1":
        payload[0] = str(datetime.now())

    if str(request.args.get("name")) == "1":
        payload[1] = "appBot"

    if str(request.args.get("exchangeRate")) == "1":
        exchange_rate_name = "EUR_CZK"
        api_key = "ffdcf3c57840096bf1a0"
        url_query = "/api/v7/convert?q={}&compact=ultra&apiKey=".format(exchange_rate_name)
        url = "https://free.currconv.com"
        api_request = "{}{}{}".format(url, url_query, api_key)
        response = requests.get(api_request)
        if response and response.status_code == 200:
            data = response.json()
            payload[2] = str(data[exchange_rate_name])
        else:
            payload[2] = "Null"

    return str(str(payload[0])+";"+payload[1]+";"+payload[2])


if __name__ == '__main__':
    app.run()
