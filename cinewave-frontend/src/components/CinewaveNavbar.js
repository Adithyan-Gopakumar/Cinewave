import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Col, Container, Form, Row, Nav } from 'react-bootstrap';

import { getCurrentUser } from '../common/util';

export default function CinewaveNavbar(props) {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();
    const isUserAdmin = currentUser?.role === 'admin';

    const title = props.title ? ` - ${props.title}` : '';

    const goToHome = () => {
        navigate('/');
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    const goToLogin = () => {
        navigate('/login');
    };

    const goToAdminDashboard = () => {
        navigate('/admin/dashboard');
    };

    return (
        <Navbar expand="lg" className="justify-content-between sticky-top bg-light-subtle">
            <Container>
                <Navbar.Brand onClick={goToHome} className="cursor-pointer">
                    <i className="bi bi-house-fill fs-5"></i>
                    &nbsp;<span className="fw-semibold">{`Cinewave ${title}`}</span>
                </Navbar.Brand>

                {!props.hideSearch && (
                    <Form inline={'true'} className="flex-fill">
                        <Row className="flex-fill">
                            <Col lg="6">
                                <Form.Control type="text" placeholder="Search shows" className=" mr-sm-2" />
                            </Col>
                        </Row>
                    </Form>
                )}

                {currentUser ? (
                    <div className="d-flex align-middle">
                        <Navbar.Brand className="align-middle cursor-pointer" onClick={goToProfile}>
                            <span className="fs-5">{currentUser?.first_name}</span>&nbsp;
                            <i className="bi bi-person-circle fs-5"></i>
                        </Navbar.Brand>
                        {isUserAdmin && (
                            <Navbar.Brand onClick={goToAdminDashboard} className="cursor-pointer">
                                <i className="bi bi-grid-1x2-fill"></i>
                            </Navbar.Brand>
                        )}
                    </div>
                ) : (
                    <Nav>
                        <Nav.Link onClick={goToLogin} className="text-primary cursor-pointer">
                            Login
                        </Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
}
