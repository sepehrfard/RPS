import os


class Config(object):
    SECRET_KEY = (
        os.environ.get("SECRET_KEY")
        or b"\xcaT\x80Q\xef\xab\xef\xbc\xa0\x911\x08\xff8N\x0c"
    )
