import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { formatCurrency, getCurrentUser } from '../../../common/util';
import { Breadcrumb, Button, Col, Container, Row, Table } from 'react-bootstrap';
import CinewaveNavbar from '../../../components/CinewaveNavbar';
import { screensApi } from '../../../queries/screens';

export default function ScreensList() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const { data: screensList } = screensApi.useList();
    const { mutate: removeScreen } = screensApi.useRemove();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this screen?')) {
            removeScreen(id);
        }
    };

    const handleEdit = id => {
        navigate(`/admin/screens/edit/${id}`);
    };

    return (
        <>
            <CinewaveNavbar title="Screens" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Breadcrumb.Item active>Screens</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => navigate('/admin/screens/add')}>
                            Add Screen
                        </Button>

                        <Table striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Premium Seat #</th>
                                    <th>Premium Seat Cost</th>
                                    <th>Executive Seat #</th>
                                    <th>Executive Seat Cost</th>
                                    <th>Normal Seat #</th>
                                    <th>Normal Seat Cost</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {screensList?.map(screen => (
                                    <tr key={screen.id}>
                                        <td>{screen.id}</td>
                                        <td>{screen.screen_name}</td>
                                        <td>{screen.premium_seat_count}</td>
                                        <td>{formatCurrency(screen.premium_seat_cost)}</td>
                                        <td>{screen.executive_seat_count}</td>
                                        <td>{formatCurrency(screen.executive_seat_cost)}</td>
                                        <td>{screen.normal_seat_count}</td>
                                        <td>{formatCurrency(screen.normal_seat_cost)}</td>
                                        <td>
                                            <Button onClick={() => handleEdit(screen.id)} variant="primary">
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            &nbsp;
                                            <Button onClick={() => handleDelete(screen.id)} variant="danger">
                                                <i className="bi bi-trash"></i>
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
