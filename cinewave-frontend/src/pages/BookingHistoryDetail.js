import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';

import CinewaveNavbar from '../components/CinewaveNavbar';
import { getCurrentUser } from '../common/util';
import { bookingsApi } from '../queries/bookings';
import BookingDetailInfo from '../components/BookingDetailInfo';
import MovieCard from '../components/MovieCard';

const BookingHistoryDetail = () => {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const { bookingId } = useParams();

    const { data: bookingDetail } = bookingsApi.useDetail(bookingId);

    useEffect(() => {
        if (!currentUser) {
            navigate('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!bookingDetail) return null;

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
                    <Link className="breadcrumb-item" to="/booking-history">
                        Booking History
                    </Link>
                    <Breadcrumb.Item active>Booking Details</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col lg="3">
                        <MovieCard movie={bookingDetail.movie} />
                    </Col>
                    <Col lg="9">
                        <BookingDetailInfo bookingDetail={bookingDetail} />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default BookingHistoryDetail;
