import React, { useEffect } from 'react';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getCurrentUser } from '../../../common/util';
import { bookingsApi } from '../../../queries/bookings';
import CinewaveNavbar from '../../../components/CinewaveNavbar';
import MovieCard from '../../../components/MovieCard';
import BookingDetailInfo from '../../../components/BookingDetailInfo';

export default function BookingDetail() {
    const navigate = useNavigate();

    const { bookingId } = useParams();

    const currentUser = getCurrentUser();

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
                    <Link className="breadcrumb-item" to="/admin/bookings">
                        Bookings
                    </Link>
                    <Breadcrumb.Item active>Booking Detail</Breadcrumb.Item>
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
}
