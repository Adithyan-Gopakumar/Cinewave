import React, { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Breadcrumb, Col, Container, Row } from 'react-bootstrap';

import { getCurrentUser } from '../../../common/util';
import { moviesApi } from '../../../queries/movies';
import CinewaveNavbar from '../../../components/CinewaveNavbar';
import { ShowInfo } from '../../../components/ShowInfo';

export default function MovieDetail() {
    const navigate = useNavigate();

    const { showId } = useParams();

    const currentUser = getCurrentUser();

    const { data: show } = moviesApi.useDetail(showId);

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (show === undefined) return null;

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
                    <Link className="breadcrumb-item" to="/admin/movies">
                        Movies
                    </Link>
                    <Breadcrumb.Item active>{show.title}</Breadcrumb.Item>
                </Breadcrumb>

                <Row>
                    <Col>
                        <ShowInfo show={show} canBookTickets={false} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
