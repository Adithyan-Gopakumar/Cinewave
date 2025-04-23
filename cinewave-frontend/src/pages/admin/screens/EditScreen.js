import React, { useEffect } from 'react';
import { Breadcrumb, Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import CinewaveNavbar from '../../../components/CinewaveNavbar';
import { getCurrentUser } from '../../../common/util';
import { screensApi } from '../../../queries/screens';

export default function EditScreen() {
    const navigate = useNavigate();

    const { screenId } = useParams();

    const { register, handleSubmit, reset } = useForm();

    const currentUser = getCurrentUser();

    const { data: screenDetail } = screensApi.useDetail(screenId);

    const { mutateAsync: updateScreen } = screensApi.useUpdate(screenId);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (screenDetail) {
            reset(screenDetail);
        }
    }, [reset, screenDetail]);

    const onSubmit = async data => {
        const response = await updateScreen(data);
        if (response?.data) {
            reset();
            navigate('/admin/screens');
        }
    };

    return (
        <>
            <CinewaveNavbar title="Edit Screen" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/screens">
                        Screens
                    </Link>
                    <Breadcrumb.Item active>Edit Screen</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Add Screen</Card.Title>
                            </Card.Body>

                            <Card.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type={'text'} {...register('screen_name')} />
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Premium Seat Count</Form.Label>
                                                <Form.Control type={'text'} {...register('premium_seat_count')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Premium Seat Cost</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="premium_seat_cost">£</InputGroup.Text>
                                                    <Form.Control type={'text'} {...register('premium_seat_cost')} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Executive Seat Count</Form.Label>
                                                <Form.Control type={'text'} {...register('executive_seat_count')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Executive Seat Cost</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="premium_seat_cost">£</InputGroup.Text>
                                                    <Form.Control type={'text'} {...register('executive_seat_cost')} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Normal Seat Count</Form.Label>
                                                <Form.Control type={'text'} {...register('normal_seat_count')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Normal Seat Cost</Form.Label>
                                                <InputGroup className="mb-3">
                                                    <InputGroup.Text id="premium_seat_cost">£</InputGroup.Text>
                                                    <Form.Control type={'text'} {...register('normal_seat_cost')} />
                                                </InputGroup>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className={'d-flex flex-column align-content-end'}>
                                            <Button variant={'success'} type={'submit'}>
                                                Update Screen
                                            </Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
