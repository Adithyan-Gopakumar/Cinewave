import React, { useEffect } from 'react';
import { Breadcrumb, Button, Col, Container, Row, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { formatCurrency, formatDate, formatTime, getCurrentUser } from '../../../common/util';
import { bookingsApi } from '../../../queries/bookings';
import CinewaveNavbar from '../../../components/CinewaveNavbar';

export default function BookingList() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const { data: bookingList } = bookingsApi.useList();

    const { mutateAsync: cancelBooking } = bookingsApi.useRemove();

    const handleCancel = async id => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            await cancelBooking(id);
        }
    };

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <CinewaveNavbar title="Bookings" />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Breadcrumb.Item active>Bookings</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User</th>
                                    <th>Movie Name</th>
                                    <th>Screen Name</th>
                                    <th>Show Time</th>
                                    <th>Booking Date </th>
                                    <th>Total Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookingList?.map(booking => (
                                    <tr key={booking.id}>
                                        <td>{booking.id}</td>
                                        <td>{`${booking.user.first_name} ${booking.user.last_name}`}</td>
                                        <td>
                                            <Link to={`/admin/movies/${booking.movie.id}`}>{booking.movie.title}</Link>
                                        </td>
                                        <td>{booking.screen.name}</td>
                                        <td>{formatTime(booking.show_timing.time)}</td>
                                        <td>{formatDate(booking.booking_date)}</td>
                                        <td>{formatCurrency(booking.total_cost)}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => navigate(`/admin/bookings/${booking.id}`)}>
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
}
