import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import CinewaveNavbar from '../components/CinewaveNavbar';
import { getCurrentUser, getProfileImage } from '../common/util';
import { Breadcrumb, Card, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';

const Profile = () => {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();
    const isUserAdmin = currentUser?.role === 'admin';

    useEffect(() => {
        if (!currentUser) navigate('/login');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const logout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    const goToBookings = () => {
        navigate('/booking-history');
    };

    const goToAdminDashboard = () => {
        navigate('/admin/dashboard');
    };

    return (
        <>
            <CinewaveNavbar title="Profile" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                </Breadcrumb>

                <Row className={'justify-content-center'}>
                    <Col lg={'4'} md={'6'} sm={'12'}>
                        <Card>
                            <Card.Body className={'text-center'}>
                                <Image src={getProfileImage(currentUser?.email)} roundedCircle />
                                <Card.Title>
                                    {currentUser?.first_name} {currentUser?.last_name}
                                </Card.Title>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>{currentUser?.email}</ListGroup.Item>
                                <ListGroup.Item>
                                    <Card.Link onClick={goToBookings} className={'cursor-pointer'}>
                                        Booking History
                                    </Card.Link>
                                </ListGroup.Item>

                                {isUserAdmin && (
                                    <ListGroup.Item>
                                        <Card.Link onClick={goToAdminDashboard} className={'cursor-pointer'}>
                                            Administrator Dashboard
                                        </Card.Link>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>

                            <Card.Body>
                                <Card.Link onClick={logout} className={'text-danger cursor-pointer'}>
                                    Logout
                                </Card.Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default Profile;
