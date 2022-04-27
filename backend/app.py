from flask import Flask
from datetime import datetime
from flask import request

app = Flask(__name__)


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route("/api/getTime")
def get_time():
    req_data = request.args.get("data")
    return req_data


if __name__ == '__main__':
    app.run()
