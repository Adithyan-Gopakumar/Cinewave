import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Breadcrumb, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { getCurrentUser } from '../../../common/util';
import { moviesApi } from '../../../queries/movies';
import CinewaveNavbar from '../../../components/CinewaveNavbar';

export default function EditMovie() {
    const navigate = useNavigate();

    const { movieId } = useParams();

    const { register, handleSubmit, reset } = useForm();

    const currentUser = getCurrentUser();

    const { data: movieDetail } = moviesApi.useDetail(movieId);

    const { mutateAsync: updateMovie } = moviesApi.useUpdate(movieId);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (movieDetail) {
            reset(movieDetail);
        }
    }, [reset, movieDetail]);

    const onSubmit = async data => {
        const response = await updateMovie(data);
        if (response?.data) {
            reset();
            navigate('/admin/movies');
        }
    };

    return (
        <>
            <CinewaveNavbar title="Edit Movie" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/movies">
                        Movies
                    </Link>
                    <Breadcrumb.Item active>Edit Movie</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title>Edit Movie</Card.Title>
                            </Card.Body>

                            <Card.Body>
                                <Form onSubmit={handleSubmit(onSubmit)}>
                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control type={'text'} {...register('title')} />
                                    </Form.Group>

                                    <Row>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Genre</Form.Label>
                                                <Form.Control type={'text'} {...register('genre')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Release Date</Form.Label>
                                                <Form.Control type={'date'} {...register('release_date')} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Language</Form.Label>
                                                <Form.Control type={'text'} {...register('language')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Duration (minutes)</Form.Label>
                                                <Form.Control type={'number'} {...register('duration_minutes')} />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Label>Rating (Out of 5)</Form.Label>
                                                <Form.Control type={'number'} {...register('rating')} />
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>About</Form.Label>
                                        <Form.Control type={'text'} {...register('about')} />
                                    </Form.Group>

                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Cast (comma separated)</Form.Label>
                                        <Form.Control type={'text'} {...register('cast')} />
                                    </Form.Group>

                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Poster (URL)</Form.Label>
                                        <Form.Control type={'text'} {...register('poster')} />
                                    </Form.Group>

                                    <Form.Group className={'mb-3'}>
                                        <Form.Label>Banner (URL)</Form.Label>
                                        <Form.Control type={'text'} {...register('banner')} />
                                    </Form.Group>

                                    <Row>
                                        <Col className={'d-flex flex-column align-content-end'}>
                                            <Button variant={'success'} type={'submit'}>
                                                Update Movie
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
