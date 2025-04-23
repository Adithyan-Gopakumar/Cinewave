import React, { useEffect } from 'react';
import { Breadcrumb, Card, Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { getCurrentUser } from '../../common/util';
import CinewaveNavbar from '../../components/CinewaveNavbar';

export default function Dashboard() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <CinewaveNavbar title="Dashboard" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                </Breadcrumb>

                <h4 className="text-dark text-center">Welcome to Cinewave Administrator Dashboard</h4>
                <br />

                <Row className="g-2">
                    <Col sm="12" m2="6" lg="3">
                        <Card>
                            <Card.Body>
                                <h5 className="card-title">Screens</h5>
                                <p className="card-text">Manage screens</p>
                                <Link to="/admin/screens" className="btn btn-primary">
                                    Go to Screens
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="12" m2="6" lg="3">
                        <Card>
                            <Card.Body>
                                <h5 className="card-title">Movies</h5>
                                <p className="card-text">Manage movies</p>
                                <Link to="/admin/movies" className="btn btn-primary">
                                    Go to Movies
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="12" m2="6" lg="3">
                        <Card>
                            <Card.Body>
                                <h5 className="card-title">Show Timings</h5>
                                <p className="card-text">Manage show timings</p>
                                <Link to="/admin/show-timings" className="btn btn-primary">
                                    Go to Show Timings
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col sm="12" m2="6" lg="3">
                        <Card>
                            <Card.Body>
                                <h5 className="card-title">Bookings</h5>
                                <p className="card-text">Manage bookings</p>
                                <Link to="/admin/bookings" className="btn btn-primary">
                                    Go to Bookings
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
