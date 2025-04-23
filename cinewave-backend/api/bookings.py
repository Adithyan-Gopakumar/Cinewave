from flask import Blueprint, request
from flask_api import status
import stripe

from middlewares.auth_middleware import token_required
from models.booking import Booking

stripe.api_key = "sk_test_51P00FU2LHIXdaHv9gp8sFFioXsuEdnxHqEWvdlb4WCKMPPiULDJq3h18QCUJvLyjGal3GXvCT9ptmw7pMhXPgKzV00vxiMbAF1"

bookings_blueprint = Blueprint(
    'bookings',
    __name__,
    '',
    '',
    '',
    '/bookings'
)


@bookings_blueprint.route("/user/", methods=['GET'])
@token_required
def get_user_bookings(current_user):
    # Create a new booking object
    booking = Booking()

    # Fetch all bookings
    bookings = booking.get_bookings_by_user_id(current_user.id)

    if bookings is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No bookings found"
        }

    return {"data": bookings}, status.HTTP_200_OK


@bookings_blueprint.route("/", methods=['GET'])
@token_required
def get_all_bookings(current_user):
    # Create a new booking object
    booking = Booking()

    # Fetch all bookings
    booking = booking.get_all_bookings()

    if booking is None:
        return {
            "status": status.HTTP_404_NOT_FOUND,
            "message": "No bookings found"
        }

    return {"data": booking}, status.HTTP_200_OK


@bookings_blueprint.route("/<int:booking_id>/", methods=['GET'])
@token_required
def get_booking(current_user, booking_id):
    # Create a new booking object
    booking = Booking()

    # Fetch booking by id
    booking = booking.get_booking_by_id(booking_id)

    if booking is None:
        return {
            "message": "Booking not found"
        }, status.HTTP_404_NOT_FOUND

    return {"data": booking}, status.HTTP_200_OK


@bookings_blueprint.route("/payment_intent/", methods=['GET'])
@token_required
def get_payment_intent(current_user):
    try:
        # Get params from URL params
        amount = request.args.get('amount', 0)
        amount_in_smallest_unit = int(amount) * 100

        payment_intent = stripe.PaymentIntent.create(
            amount=amount_in_smallest_unit,
            currency="gbp",
            automatic_payment_methods={"enabled": True},
        )

        if payment_intent is None:
            return {
                "message": "Failed to create payment intent"
            }, status.HTTP_400_BAD_REQUEST

        return {"data": payment_intent}, status.HTTP_200_OK

    except Exception as e:
        return {
            "message": "Failed to create payment intent",
            "error": str(e)
        }, status.HTTP_400_BAD_REQUEST


@bookings_blueprint.route("/", methods=['POST'])
@token_required
def add_booking(current_user):
    # Create a new booking object
    booking = Booking()

    # Get the booking details from request
    booking.user_id = current_user.id
    booking.movie_id = request.form.get('movie_id', '')
    booking.screen_id = request.form.get('screen_id', '')
    booking.show_timing_id = request.form.get('show_timing_id', '')
    booking.premium_seat_count = request.form.get('premium_seat_count', '')
    booking.premium_seat_cost = request.form.get('premium_seat_cost', '')
    booking.executive_seat_count = request.form.get('executive_seat_count', '')
    booking.executive_seat_cost = request.form.get('executive_seat_cost', '')
    booking.normal_seat_count = request.form.get('normal_seat_count', '')
    booking.normal_seat_cost = request.form.get('normal_seat_cost', '')
    booking.total_cost = request.form.get('total_cost', '')
    booking.payment_id = request.form.get('payment_id', '')

    # Add booking
    result = booking.add_booking()
    if result is None:
        return {
            "status": status.HTTP_400_BAD_REQUEST,
            "message": "Failed to add booking"
        }

    return {"data": result}, status.HTTP_201_CREATED


@bookings_blueprint.route("/<int:booking_id>/", methods=['PATCH'])
@token_required
def update_booking(current_user, booking_id):
    # Create a new booking object
    booking = Booking()

    # Get the booking details from request
    booking.id = booking_id
    booking.user_id = current_user.id
    booking.movie_id = request.form.get('movie_id', '')
    booking.screen_id = request.form.get('screen_id', '')
    booking.show_timing_id = request.form.get('show_timing_id', '')
    booking.booking_date = request.form.get('booking_date', '')
    booking.premium_seat_count = request.form.get('premium_seat_count', '')
    booking.premium_seat_cost = request.form.get('premium_seat_cost', '')
    booking.executive_seat_count = request.form.get('executive_seat_count', '')
    booking.executive_seat_cost = request.form.get('executive_seat_cost', '')
    booking.normal_seat_count = request.form.get('normal_seat_count', '')
    booking.normal_seat_cost = request.form.get('normal_seat_cost', '')
    booking.total_cost = request.form.get('total_cost', '')

    # Update booking
    booking.update_booking()

    return {"message": "Booking updated successfully"}, status.HTTP_200_OK




@bookings_blueprint.route("/<int:booking_id>/", methods=['DELETE'])
@token_required
def delete_booking(current_user, booking_id):
    # Create a new booking object
    booking = Booking()

    # Delete booking
    booking.id = booking_id
    booking.delete_booking()

    return {"message": "Booking deleted successfully"}, status.HTTP_200_OK
