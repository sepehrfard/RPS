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

# from PIL import Image
import os


def load_model():
    learner = load_learner("classifier", "rps.pkl")
    return learner


@app.route("/")
@app.route("/index")
@app.route("/home")
def index():
    return render_template("index.html", index=True)


@app.route("/img", methods=["POST", "GET"])
# async def get_img():
#     body = await request.form()
#     binary_data = a2b_base64(body["imgBase64"])
#     img = open_image(BytesIO(binary_data))
#     return await Response(jsonify({"img": 10}), status=200)


def get_img():
    model = load_model()
    pred = "none"
    if request.method == "POST":
        data = request.json["image"]
        pred = get_pred(data, model)
        labels = ["paper", "rock", "scissor"]
        response = {"pred": pred.obj}
        return jsonify(response)
    return render_template("img_page.html", pred=pred)
    # return jsonify({"pred": pred}), 200


def get_pred(img, model):
    im = open_image(BytesIO(base64.b64decode(img)))
    pred = classify.predict(im, model)
    return pred
