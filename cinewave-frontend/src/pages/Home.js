import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

import ShowGrid from '../components/ShowGrid';
import CinewaveNavbar from '../components/CinewaveNavbar';
import { moviesApi } from '../queries/movies';
import MovieCarousel from '../components/Carousel';

export default function Home() {
    const { data: trendingMovies } = moviesApi.useTrendingList();
    const { data: upcomingMovies } = moviesApi.useUpcomingList();

    return (
        <>
            <CinewaveNavbar title="Home" />
            <br />

            <Container>
                <MovieCarousel />
                <br />

                <Row>
                    <Col>
                        <h1>Trending Movies</h1>
                        <br />
                        <ShowGrid shows={trendingMovies} />
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <h1>Upcoming Movies</h1>
                        <br />
                        <ShowGrid shows={upcomingMovies} />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
