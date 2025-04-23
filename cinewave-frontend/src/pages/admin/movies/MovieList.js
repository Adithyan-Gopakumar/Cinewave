import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Breadcrumb, Button, Col, Container, Row, Table } from 'react-bootstrap';

import { convertMinsToHours, formatDate, getCurrentUser } from '../../../common/util';
import { moviesApi } from '../../../queries/movies';
import CinewaveNavbar from '../../../components/CinewaveNavbar';

export default function MovieList() {
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const { data: moviesList } = moviesApi.useList('title');
    const { mutate: removeMovie } = moviesApi.useRemove();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleDelete = id => {
        if (window.confirm('Are you sure you want to delete this movie?')) {
            removeMovie(id);
        }
    };

    const handleEdit = id => {
        navigate(`/admin/movies/edit/${id}`);
    };

    return (
        <>
            <CinewaveNavbar title="Movies" hideSearch />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Link className="breadcrumb-item" to="/admin/dashboard">
                        Dashboard
                    </Link>
                    <Breadcrumb.Item active>Movies</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <Button variant="primary" onClick={() => navigate('/admin/movies/add')}>
                            Add Movie
                        </Button>

                        <Table striped>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Genre</th>
                                    <th>Release Date</th>
                                    <th>Language</th>
                                    <th>Duration</th>
                                    <th>Rating</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {moviesList?.map(movie => (
                                    <tr key={movie.id}>
                                        <td>{movie.id}</td>
                                        <td>{movie.title}</td>
                                        <td>{movie.genre}</td>
                                        <td>{formatDate(movie.release_date)}</td>
                                        <td>{movie.language}</td>
                                        <td>{convertMinsToHours(movie.duration_minutes)}</td>
                                        <td>{movie.rating}</td>
                                        <td>
                                            <Button
                                                variant="info"
                                                onClick={() => navigate(`/admin/movies/${movie.id}`)}>
                                                <i className="bi bi-eye"></i>
                                            </Button>
                                            &nbsp;
                                            <Button variant="primary" onClick={() => handleEdit(movie.id)}>
                                                <i className="bi bi-pencil"></i>
                                            </Button>
                                            &nbsp;
                                            <Button variant="danger" onClick={() => handleDelete(movie.id)}>
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
