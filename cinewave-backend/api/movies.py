from flask import Blueprint, request
from flask_api import status

from middlewares.auth_middleware import token_required
from models.movie import Movie

movies_blueprint = Blueprint(
    'movies',
    __name__,
    '',
    '',
    '',
    '/movies'
)


@movies_blueprint.route("/", methods=['GET'])
def get_all_movies():
    # Create a new movie object
    movie = Movie()

    # Get params from URL params
    order_by = request.args.get('order_by', 'release_date')
    order_type = request.args.get('order_type', 'ASC')

    # Fetch all movies
    movies = movie.get_all_movies(order_by, order_type)

    if movies is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No movies found"
        }

    return {"data": movies}, status.HTTP_200_OK


@movies_blueprint.route("/trending/", methods=['GET'])
def get_trending_movies():
    # Create a new movie object
    movie = Movie()

    # Fetch all movies
    movies = movie.get_trending_movies()

    if movies is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No movies found"
        }

    return {"data": movies}, status.HTTP_200_OK


@movies_blueprint.route("/upcoming/", methods=['GET'])
def get_upcoming_movies():
    # Create a new movie object
    movie = Movie()

    # Fetch all movies
    movies = movie.get_upcomig_movies()

    if movies is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No movies found"
        }

    return {"data": movies}, status.HTTP_200_OK


@movies_blueprint.route("/<int:movie_id>/", methods=['GET'])
def get_movie(movie_id):
    # Create a new movie object
    movie = Movie()

    # Fetch movie by id
    movie = movie.get_movie_by_id(movie_id)

    if movie is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "Movie not found"
        }

    return {"data": movie}, status.HTTP_200_OK


@movies_blueprint.route("/", methods=['POST'])
@token_required
def add_movie(current_user):
    # Create a new movie object
    movie = Movie()

    # Get the movie details from request
    movie.title = request.form.get('title', '')
    movie.genre = request.form.get('genre', '')
    movie.release_date = request.form.get('release_date', '')
    movie.language = request.form.get('language', '')
    movie.duration_minutes = request.form.get('duration_minutes', '')
    movie.rating = request.form.get('rating', '')
    movie.about = request.form.get('about', '')
    movie.cast = request.form.get('cast', '')
    movie.poster = request.form.get('poster', '')
    movie.banner = request.form.get('banner', '')

    # Add movie
    result = movie.add_movie()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to add movie"
        }

    return {"data": result}, status.HTTP_201_CREATED


@movies_blueprint.route("/<int:movie_id>/", methods=['PATCH'])
@token_required
def update_movie(current_user, movie_id):
    # Create a new movie object
    movie = Movie()

    # Get the movie details from request
    movie.id = movie_id
    movie.title = request.form.get('title', '')
    movie.genre = request.form.get('genre', '')
    movie.release_date = request.form.get('release_date', '')
    movie.language = request.form.get('language', '')
    movie.duration_minutes = request.form.get('duration_minutes', '')
    movie.rating = request.form.get('rating', '')
    movie.about = request.form.get('about', '')
    movie.cast = request.form.get('cast', '')
    movie.poster = request.form.get('poster', '')
    movie.banner = request.form.get('banner', '')

    # Update movie
    result = movie.update_movie()

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to update movie"
        }

    return {"data": result}, status.HTTP_201_CREATED


@movies_blueprint.route("/<int:movie_id>/", methods=['DELETE'])
@token_required
def delete_movie(current_user, movie_id):
    # Create a new movie object
    movie = Movie()

    # # Set the movie id
    # movie.id = movie_id
    #
    # # Delete movie
    # movie.delete_movie()
    #
    # return {"message": "Movie deleted successfully"}, status.HTTP_200_OK

    # Delete the screen
    result = movie.delete_movie(movie_id)

    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to delete movie"
        }

    return {"data": result}, status.HTTP_200_OK
