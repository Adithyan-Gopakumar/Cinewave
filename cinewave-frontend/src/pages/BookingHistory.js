import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CinewaveNavbar from '../components/CinewaveNavbar';
import { formatCurrency, formatDate, formatTime, getCurrentUser } from '../common/util';
import { bookingsApi } from '../queries/bookings';
import { Breadcrumb, Button, Col, Container, Row, Table } from 'react-bootstrap';

const BookingHistory = () => {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();

    const { data: userBookings } = bookingsApi.useUserList();

    const { mutateAsync: cancelBooking } = bookingsApi.useRemove();

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleCancel = async id => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            await cancelBooking(id);
        }
    };

    return (
        <>
            <CinewaveNavbar title="Booking History" />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/profile">
                        Profile
                    </Link>
                    <Breadcrumb.Item active>Booking History</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <h3>Booking History</h3>
                        <br />

                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Movie Name</th>
                                    <th>Screen Name</th>
                                    <th>Show Time</th>
                                    <th>Booking Date </th>
                                    <th>Total Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userBookings?.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>
                                            <Link to={`/show/${booking.movie.id}`}>{booking.movie.title}</Link>
                                        </td>
                                        <td>{booking.screen.name}</td>
                                        <td>{formatTime(booking.show_timing.time)}</td>
                                        <td>{formatDate(booking.booking_date)}</td>
                                        <td>{formatCurrency(booking.total_cost)}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => navigate(`/booking-history/${booking.id}`)}>
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => handleCancel(booking.id)}>
                                                <i className="bi bi-x-circle"></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BookingHistory;
