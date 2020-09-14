from application import app, api
from flask import (
    render_template,
    request,
    json,
    Response,
    make_response,
    redirect,
    flash,
    url_for,
    session,
    jsonify,
)
from binascii import a2b_base64
from flask_restx import Resource
from io import BytesIO
import base64
from application import classify
from fastai.vision import *

from PIL import Image
import os


def load_model():
    learner = load_learner("classifier", "rps_final.pkl")
    return learner


@app.route("/")
@app.route("/index")
@app.route("/home")
def index():
    return render_template("index.html", index=True)


model = load_model()


@app.route("/img", methods=["POST", "GET"])
def get_img():
    req = request.get_json()
    pred = get_pred(req["img"], model)
    print(pred)
    res = make_response(jsonify({"pred": pred.obj}))
    return res


def get_pred(img, model):
    im = open_image(BytesIO(base64.b64decode(img)))
    pred = classify.predict(im, model)
    return pred
