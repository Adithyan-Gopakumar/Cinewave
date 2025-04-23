import jwt

from functools import wraps
from flask import request
from flask_api import status

from main import app
from models.user import User


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return {
                "message": "Authorization token is missing!",
            }, status.HTTP_401_UNAUTHORIZED

        current_user = User()

        try:
            data = jwt.decode(token, app.config["AUTH_SECRET"], algorithms=["HS256"])

            current_user.get_user(data["email"])

            if current_user.id is None:
                return {
                    "message": "Invalid authorization token!",
                }, status.HTTP_401_UNAUTHORIZED

        except Exception as e:
            return {
                "message": "Something went wrong",
            }, status.HTTP_500_INTERNAL_SERVER_ERROR

        return f(current_user, *args, **kwargs)

    return decorated
