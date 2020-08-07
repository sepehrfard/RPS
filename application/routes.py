from application import app, api
from flask import (
    render_template,
    request,
    json,
    Response,
    redirect,
    flash,
    url_for,
    session,
    jsonify,
)
from binascii import a2b_base64
from flask_restx import Resource


@app.route("/")
@app.route("/index")
@app.route("/home")
def index():
    return render_template("index.html", index=True)


@app.route("/img", methods=["POST", "GET"])
async def get_img():
    body = await equest.form()
    binary_data = a2b_base64(body["imgBase64"])
    img = open_image(BytesIO(binary_data))
    return await Response(jsonify({"img": 10}), status=200)
