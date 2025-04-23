import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Col, Container, Form, Row, Table } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { formatDate, formatTime, getCurrentUser } from '../../../common/util';
import CinewaveNavbar from '../../../components/CinewaveNavbar';
import { showTimingsApi } from '../../../queries/showTimings';
import { moviesApi } from '../../../queries/movies';

export default function ShowTimingsList() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const { register, handleSubmit, reset } = useForm();

    const [movieId, setMovieId] = useState();

    const { data: showTimingsList, refetch: refreshShowTimes } = showTimingsApi.useList(movieId);

    const { data: moviesList } = moviesApi.useList();

    const { mutate: removeShowTiming } = showTimingsApi.useRemove();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this show?')) {
            removeShowTiming(id);
        }
    };

    const handleEdit = id => {
        navigate(`/admin/show-timings/edit/${id}`);
    };

    const onMovieChange = e => {
        const movieId = e.target.value;
        setMovieId(movieId);
        refreshShowTimes();
    };

    const onSubmit = data => {
        setMovieId(data.movie_id);
    };

    const clearSelectedMovie = () => {
        setMovieId();
        reset();
        refreshShowTimes();
    };

    return (
        <>
            <CinewaveNavbar title="Show Timings" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Breadcrumb.Item active>Show Timings</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Row className="gap-2">
                            <Col lg="12">
                                <Button variant="primary" onClick={() => navigate('/admin/show-timings/add')}>
                                    Add Show Time
                                </Button>
                            </Col>

                            <Col lg="12">
                                <Row>
                                    <Col lg="10">
                                        <Form onChange={onMovieChange} onSubmit={handleSubmit(onSubmit)}>
                                            <Form.Group className={'mb-3'}>
                                                <Form.Select aria-label="Select Movie" {...register('movie_id')}>
                                                    <option key={null}>Choose movie</option>
                                                    {moviesList?.map(movie => (
                                                        <option key={movie.id} value={movie.id}>
                                                            {movie.title}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </Form>
                                    </Col>
                                    <Col>
                                        <Button variant="secondary" onClick={clearSelectedMovie}>
                                            <i className="bi bi-x-circle"></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Table striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Movie Title</th>
                                    <th>Screen Name</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {showTimingsList?.map(showTime => (
                                    <tr key={showTime.id}>
                                        <td>{showTime.id}</td>
                                        <td>{showTime.movie.title}</td>
                                        <td>{showTime.screen.screen_name}</td>
                                        <td>{formatDate(showTime.date)}</td>
                                        <td>{formatTime(showTime.time)}</td>

                                        <td>
                                            <Button variant="primary" onClick={() => handleEdit(showTime.id)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => handleDelete(showTime.id)}>
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
