from flask import Blueprint, request
from flask_api import status

from middlewares.auth_middleware import token_required
from models.show_timing import ShowTiming

show_timings_blueprint = Blueprint(
    'show_timings',
    __name__,
    '',
    '',
    '',
    '/show_timings'
)


@show_timings_blueprint.route("/", methods=['GET'])
def get_all_show_timings():
    # Create a new show timing object
    show_timing = ShowTiming()

    # Get params from URL params
    movie_id = request.args.get('movie_id', None)
    date = request.args.get('date', None)

    # Fetch all show timings
    show_timings = show_timing.get_all_show_timings(movie_id, date)

    if show_timings is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No show timings found"
        }

    return {"data": show_timings}, status.HTTP_200_OK


@show_timings_blueprint.route("/<int:show_timing_id>/", methods=['GET'])
@token_required
def get_show_timing(current_user, show_timing_id):
    # Create a new show timing object
    show_timing = ShowTiming()

    # Fetch show timing
    show_timings = show_timing.get_show_timing_by_id(show_timing_id)

    if show_timings is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No show timings found"
        }

    return {"data": show_timings}, status.HTTP_200_OK


@show_timings_blueprint.route("/", methods=['POST'])
@token_required
def add_show_timing(current_user):
    # Create a new show timing object
    show_timing = ShowTiming()

    # Get the show timing details from request
    show_timing.movie_id = request.form.get('movie_id', '')
    show_timing.screen_id = request.form.get('screen_id', '')
    show_timing.date = request.form.get('date', '')
    show_timing.time = request.form.get('time', '')

    # Add show timing
    result = show_timing.add_show_timing()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to add show_timing"
        }

    return {"data": result}, status.HTTP_201_CREATED


@show_timings_blueprint.route("/<int:show_timing_id>/", methods=['PATCH'])
@token_required
def update_show_timing(current_user, show_timing_id):
    # Create a new show timing object
    show_timing = ShowTiming()

    # Get the show timing details from request
    show_timing.id = show_timing_id
    show_timing.movie_id = request.form.get('movie_id', '')
    show_timing.screen_id = request.form.get('screen_id', '')
    show_timing.date = request.form.get('date', '')
    show_timing.time = request.form.get('time', '')

    # Update show timing
    result = show_timing.update_show_timing()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to update show_timing"
        }

    return {"data": result}, status.HTTP_200_OK


@show_timings_blueprint.route("/<int:show_timing_id>/", methods=['DELETE'])
@token_required
def delete_show_timing(current_user, show_timing_id):
    # Create a new show timing object
    show_timing = ShowTiming()

    # Set the show timing id
    show_timing.id = show_timing_id

    # Delete show timing
    result = show_timing.delete_show_timing()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to delete show_timing"
        }

    return {"data": result}, status.HTTP_200_OK
