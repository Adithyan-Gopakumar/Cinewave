from flask import Blueprint, request
from flask_api import status
import jwt

from main import app
from middlewares.auth_middleware import token_required
from models.user import User

users_blueprint = Blueprint(
    'users',
    __name__,
    '',
    '',
    '',
    '/users'
)


@users_blueprint.route("/login/", methods=['POST'])
def login():
    try:
        # Create a new user object
        current_user = User()

        # Get the request data
        email = request.form.get('email', '')
        password = request.form.get('password', '')

        if not email or not password:
            return {
                "message": "Please provide user credentials",
            }, status.HTTP_400_BAD_REQUEST

        # Validate user credentials
        success = current_user.login(email, password)

        if success and current_user.id:
            try:
                # Token should expire after 24 hrs
                token = jwt.encode(
                    {
                        "id": current_user.id,
                        "email": current_user.email,
                        "first_name": current_user.first_name,
                        "last_name": current_user.last_name,
                        "role": current_user.role,
                    },
                    app.config["AUTH_SECRET"],
                    algorithm="HS256"
                )
                return {
                    "token": token,
                    "user": {
                        "id": current_user.id,
                        "email": current_user.email,
                        "first_name": current_user.first_name,
                        "last_name": current_user.last_name,
                        "role": current_user.role,
                    }
                }, status.HTTP_200_OK

            except Exception as e:
                return {
                    "error": "Something went wrong",
                    "message": str(e)
                }, status.HTTP_500_INTERNAL_SERVER_ERROR

        return {
            "message": "Invalid email or password",
        }, status.HTTP_401_UNAUTHORIZED

    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
        }, status.HTTP_500_INTERNAL_SERVER_ERROR


@users_blueprint.route("/register/", methods=['POST'])
def register():
    try:
        # Create a new user object
        user = User()

        # Get the request data
        user.email = request.form.get('email', '')
        user.first_name = request.form.get('first_name', '')
        user.last_name = request.form.get('last_name', '')
        user.password = request.form.get('password', '')
        user.password_repeat = request.form.get('password_repeat', '')
        user.role = request.form.get('role', None) or 'user'

        # Validate user data
        error = user.validate_user()

        if error:
            return {
                "message": "Please provide valid user data",
            }, status.HTTP_400_BAD_REQUEST

        # Create user
        success = user.create()

        if success:
            return {
                "message": "User created successfully",
            }, status.HTTP_201_CREATED

        return {
            "message": "User creation failed",
        }, status.HTTP_500_INTERNAL_SERVER_ERROR

    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
        }, status.HTTP_500_INTERNAL_SERVER_ERROR


@users_blueprint.route("/all/", methods=['GET'])
@token_required
def get_all_users(current_user):
    try:
        # Create a new user object
        user = User()

        # Fetch all users
        users = user.get_all_users()

        if users is None:
            return {"message": "No users found"}, status.HTTP_404_NOT_FOUND

        return {"data": users}, status.HTTP_200_OK

    except Exception as e:
        return {
            "message": "Something went wrong!",
            "error": str(e),
        }, status.HTTP_500_INTERNAL_SERVER_ERROR
