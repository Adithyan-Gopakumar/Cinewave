from flask_api import status  # For Flask API

from api.bookings import bookings_blueprint
from api.movies import movies_blueprint
from api.screens import screens_blueprint
from api.show_timings import show_timings_blueprint
from api.users import users_blueprint
from main import app

app.register_blueprint(users_blueprint)
app.register_blueprint(screens_blueprint)
app.register_blueprint(movies_blueprint)
app.register_blueprint(show_timings_blueprint)
app.register_blueprint(bookings_blueprint)


@app.route("/")
def index():
    return {
        "message": "Welcome to Cinewave API",
        "status": "success",
    }, status.HTTP_200_OK


if __name__ == "__main__":
    app.run(port=8000, debug=True)
