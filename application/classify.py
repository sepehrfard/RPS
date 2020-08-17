from fastai.vision import *
from fastai.metrics import error_rate
import base64
import numpy as np
import warnings

warnings.filterwarnings("ignore")


def predict(img, learner):
    labels = ["paper", "rock", "scissor"]
    predict = learner.predict(img)
    return predict[0]
