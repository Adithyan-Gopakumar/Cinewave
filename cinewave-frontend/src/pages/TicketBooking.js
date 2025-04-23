import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Button, Card, Col, Container, Form, ListGroup, Row, Spinner } from 'react-bootstrap';
import { stripeApi } from '../queries/payments';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import ShowTimeSelector from '../components/ShowTimeSelector';
import SeatSelection from '../components/SeatSelection';
import { bookingsApi } from '../queries/bookings';
import { screensApi } from '../queries/screens';
import { moviesApi } from '../queries/movies';
import { showTimingsApi } from '../queries/showTimings';
import CinewaveNavbar from '../components/CinewaveNavbar';
import { formatCurrency, getCurrentUser } from '../common/util';
import DateSelector from '../components/DateSelector';
import ScreenSelector from '../components/ScreenSelector';
import MovieCard from '../components/MovieCard';
import PaymentCard from '../components/PaymentCard';

const stripePromise = loadStripe(
    'pk_test_51P00FU2LHIXdaHv92aCze2hpJJbuOyQy80lfAhjieNAYlaNmoSkLsL8Gbn0VZV8wyfmKURflUo3yqU2OI3kbNWsx00tTj26vPb'
);

export default function TicketBooking() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    let { showId } = useParams();

    const [movie, setMovie] = useState();
    const [selectedDate, setSelectedDate] = useState();
    const [selectedScreen, setSelectedScreen] = useState();
    const [selectedShowTime, setSelectedShowTime] = useState();
    const [selectedSeats, setSelectedSeats] = useState({
        premium: 0,
        executive: 0,
        normal: 0
    });
    const [readyForPayment, setReadyForPayment] = useState(false);

    const { data: showTimingsByDate } = showTimingsApi.useList(showId);

    const { data: showTimingsList } = showTimingsApi.useList(showId, selectedDate);

    const { mutateAsync: createBooking } = bookingsApi.useCreate();

    const { data: screensList } = screensApi.useList();

    const { data: showDetail } = moviesApi.useDetail(showId);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login', { state: { from: `/show/${showId}/book-tickets` } });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalCost = useMemo(() => {
        if (!selectedScreen) return 0;

        const total =
            selectedScreen.premium_seat_cost * selectedSeats.premium +
            selectedScreen.executive_seat_cost * selectedSeats.executive +
            selectedScreen.normal_seat_cost * selectedSeats.normal;
        return total;
    }, [selectedScreen, selectedSeats]);

    const { data: paymentIntent } = stripeApi.usePaymentIntent(totalCost, readyForPayment);
    const options = {
        clientSecret: paymentIntent?.client_secret
    };

    const canBook = useMemo(() => {
        return (
            selectedScreen &&
            selectedShowTime &&
            selectedSeats.premium + selectedSeats.executive + selectedSeats.normal > 0
        );
    }, [selectedScreen, selectedShowTime, selectedSeats]);

    useEffect(() => {
        if (showDetail) setMovie(showDetail);
    }, [showDetail]);

    // Clear selected screen when date changes
    useEffect(() => {
        setSelectedScreen();
    }, [selectedDate]);

    // Clear selected show time when screen changes
    useEffect(() => {
        setSelectedShowTime();
    }, [selectedScreen]);

    // Clear selected seats when show time changes
    useEffect(() => {
        setSelectedSeats({
            premium: 0,
            executive: 0,
            normal: 0
        });
    }, [selectedShowTime]);

    const onBookingCreate = async paymentInfo => {
        const result = await createBooking({
            movie_id: movie.id,
            screen_id: selectedScreen.id,
            show_timing_id: selectedShowTime.id,
            premium_seat_count: selectedSeats.premium,
            premium_seat_cost: selectedScreen.premium_seat_cost * selectedSeats.premium,
            executive_seat_count: selectedSeats.executive,
            executive_seat_cost: selectedScreen.executive_seat_cost * selectedSeats.executive,
            normal_seat_count: selectedSeats.normal,
            normal_seat_cost: selectedScreen.normal_seat_cost * selectedSeats.normal,
            total_cost: totalCost,
            payment_id: paymentInfo.id
        });

        if (result) {
            alert('Booking successful');
            navigate(`/booking-history/${result.data}`);
        }
    };

    const renderDateSelect = () => {
        if (!showTimingsByDate) return null;

        const dates = showTimingsByDate.map(showTiming => showTiming.date);
        const uniqueDates = [...new Set(dates)];

        return (
            <ListGroup.Item>
                <DateSelector dates={uniqueDates} onDateChange={setSelectedDate} />
            </ListGroup.Item>
        );
    };

    const renderScreenSelect = () => {
        if (!movie) return null;
        if (!selectedDate) return null;
        if (!showTimingsList) return null;

        const screenIds = showTimingsList.map(showTiming => showTiming.screen.id);
        const uniqueScreenIds = [...new Set(screenIds)];
        const screens = screensList.filter(screen => uniqueScreenIds.includes(screen.id));

        return (
            <ListGroup.Item>
                <ScreenSelector screens={screens} onScreenChange={setSelectedScreen} />
            </ListGroup.Item>
        );
    };

    const renderShowTimeSelector = () => {
        if (!movie) return null;
        if (!selectedDate) return null;
        if (!selectedScreen) return null;
        if (!showTimingsList) return null;

        const filteredShowTimings = showTimingsList.filter(
            showTiming => showTiming.screen.id.toString() === selectedScreen.id.toString()
        );

        return (
            <ListGroup.Item>
                <ShowTimeSelector showTimes={filteredShowTimings} onShowTimeChange={setSelectedShowTime} />
            </ListGroup.Item>
        );
    };

    const renderSeatSelector = () => {
        if (!movie) return null;
        if (!selectedScreen) return null;
        if (!selectedShowTime) return null;

        return (
            <ListGroup.Item>
                <SeatSelection
                    premiumSeatTotal={selectedScreen.premium_seat_count}
                    executiveSeatTotal={selectedScreen.executive_seat_count}
                    normalSeatTotal={selectedScreen.normal_seat_count}
                    screen={selectedScreen}
                    onSeatCountChange={setSelectedSeats}
                />
            </ListGroup.Item>
        );
    };

    const renderTotalAmount = () => {
        if (!movie) return null;
        if (!selectedScreen) return null;
        if (!selectedShowTime) return null;

        return (
            <ListGroup.Item>
                <h5>{`Total Amount: ${formatCurrency(totalCost)}`}</h5>
            </ListGroup.Item>
        );
    };

    if (!movie) {
        return (
            <div className="position-absolute modal-fullscreen d-flex justify-content-center align-content-center">
                <div className="d-flex justify-content-center align-content-center">
                    <Spinner animation="border" />
                </div>
            </div>
        );
    }

    return (
        <>
            <CinewaveNavbar title={'Ticket Booking'} />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to={`/show/${showId}`}>
                        {showDetail?.title}
                    </Link>
                    <Breadcrumb.Item active>Ticket Booking</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col lg="3">
                        <MovieCard movie={movie} />
                    </Col>
                    <Col lg="9">
                        <Form>
                            <Card>
                                <ListGroup className="list-group-flush">
                                    {renderDateSelect()}
                                    {renderScreenSelect()}
                                    {renderShowTimeSelector()}
                                    {renderSeatSelector()}
                                    {renderTotalAmount()}
                                </ListGroup>
                                <Card.Footer>
                                    <Button
                                        variant="primary"
                                        onClick={() => setReadyForPayment(true)}
                                        disabled={!canBook || readyForPayment}>
                                        Proceed to Pay
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </Form>
                        <br />
                        {readyForPayment && options?.clientSecret && (
                            <Elements stripe={stripePromise} options={options}>
                                <PaymentCard createBooking={onBookingCreate} />
                            </Elements>
                        )}
                    </Col>
                </Row>
            </Container>
            <br />
        </>
    );
}
