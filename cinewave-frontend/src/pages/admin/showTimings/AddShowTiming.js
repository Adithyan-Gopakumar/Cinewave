import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { getCurrentUser } from '../../../common/util';
import { moviesApi } from '../../../queries/movies';
import { screensApi } from '../../../queries/screens';
import CinewaveNavbar from '../../../components/CinewaveNavbar';
import { showTimingsApi } from '../../../queries/showTimings';

export default function AddShowTiming() {
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const currentUser = getCurrentUser();

    const { data: moviesList } = moviesApi.useList();

    const { data: screensList } = screensApi.useList();

    const { mutateAsync: createShowTime } = showTimingsApi.useCreate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async data => {
        const response = await createShowTime(data);
        if (response.data) {
            reset();
            navigate('/admin/show-timings');
        }
    };

    return (
        <>
            <CinewaveNavbar title="Add Show Timing" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/show-timings">
                        Show Timings
                    </Link>
                    <Breadcrumb.Item active>Add Show Time</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Add Show Timing</Card.Title>
                            </Card.Body>

                            <Card.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Movie</Form.Label>
                                        <Form.Select aria-label="Select Movie" {...register('movie_id')}>
                                            <option>Choose movie</option>
                                            {moviesList?.map(movie => (
                                                <option key={movie.id} value={movie.id}>
                                                    {movie.title}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Screen</Form.Label>
                                        <Form.Select aria-label="Select Screen" {...register('screen_id')}>
                                            <option>Choose screen</option>
                                            {screensList?.map(screen => (
                                                <option key={screen.id} value={screen.id}>
                                                    {screen.screen_name}
                                                </option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Date</Form.Label>
                                                <Form.Control type={'date'} {...register('date')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Time</Form.Label>
                                                <Form.Control type={'time'} {...register('time')} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className={'d-flex flex-column align-content-end'}>
                                            <Button variant={'success'} type={'submit'}>
                                                Add Show Time
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
