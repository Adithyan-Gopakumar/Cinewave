from flask import Blueprint, request
from flask_api import status

from middlewares.auth_middleware import token_required
from models.screen import Screen

screens_blueprint = Blueprint(
    'screens',
    __name__,
    '',
    '',
    '',
    '/screens'
)


@screens_blueprint.route("/", methods=['GET'])
def get_all_screens():
    # Create a new screen object
    screen = Screen()

    # Fetch all screens
    screens = screen.get_all_screens()

    if screens is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No screens found"
        }

    return {"data": screens}, status.HTTP_200_OK


@screens_blueprint.route("/<int:screen_id>/", methods=['GET'])
def get_screen(screen_id):
    # Create a new screen object
    screen = Screen()

    # Fetch screen by id
    screen = screen.get_screen_by_id(screen_id)

    if screen is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "Screen not found"
        }

    return {"data": screen}, status.HTTP_200_OK


@screens_blueprint.route("/", methods=['POST'])
@token_required
def add_screen(current_user):
    # Create a new screen object
    screen = Screen()

    # Get the screen details from request
    screen.screen_name = request.form.get('screen_name', '')
    screen.premium_seat_count = request.form.get('premium_seat_count', '')
    screen.premium_seat_cost = request.form.get('premium_seat_cost', '')
    screen.executive_seat_count = request.form.get('executive_seat_count', '')
    screen.executive_seat_cost = request.form.get('executive_seat_cost', '')
    screen.normal_seat_count = request.form.get('normal_seat_count', '')
    screen.normal_seat_cost = request.form.get('normal_seat_cost', '')

    # Add the screen
    result = screen.add_screen()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to add screen"
        }

    return {"data": result}, status.HTTP_201_CREATED


@screens_blueprint.route("/<int:screen_id>/", methods=['PATCH'])
@token_required
def update_screen(current_user, screen_id):
    # Create a new screen object
    screen = Screen()

    # Get the screen details from request
    screen.id = screen_id
    screen.screen_name = request.form.get('screen_name', '')
    screen.premium_seat_count = request.form.get('premium_seat_count', '')
    screen.premium_seat_cost = request.form.get('premium_seat_cost', '')
    screen.executive_seat_count = request.form.get('executive_seat_count', '')
    screen.executive_seat_cost = request.form.get('executive_seat_cost', '')
    screen.normal_seat_count = request.form.get('normal_seat_count', '')
    screen.normal_seat_cost = request.form.get('normal_seat_cost', '')

    # Update the screen
    result = screen.update_screen()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to update screen"
        }

    return {"data": result}, status.HTTP_200_OK


@screens_blueprint.route("/<int:screen_id>/", methods=['DELETE'])
@token_required
def delete_screen(current_user, screen_id):
    # Create a new screen object
    screen = Screen()

    # Delete the screen
    result = screen.delete_screen(screen_id)

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to delete screen"
        }

    return {"data": result}, status.HTTP_200_OK
