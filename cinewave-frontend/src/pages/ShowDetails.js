import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ShowInfo } from '../components/ShowInfo';
import ShowGrid from '../components/ShowGrid';
import { moviesApi } from '../queries/movies';
import CinewaveNavbar from '../components/CinewaveNavbar';
import { Breadcrumb, Container } from 'react-bootstrap';

export default function ShowDetails() {
    const { showId } = useParams();

    const { data: show } = moviesApi.useDetail(showId);
    const { data: shows } = moviesApi.useList();

    const randomShows = useMemo(() => {
        if (shows === undefined) return;
        return shows.sort(() => Math.random() - 0.5).slice(0, 4);
    }, [shows]);

    if (show === undefined) return null;
    if (shows === undefined) return null;

    return (
        <>
            <CinewaveNavbar title={show.title} />
            <br />

            <Container>
                <Breadcrumb>
                    <Link className="breadcrumb-item" to="/">
                        Home
                    </Link>
                    <Breadcrumb.Item active>{show.title}</Breadcrumb.Item>
                </Breadcrumb>

                <ShowInfo show={show} />

                <div className="mt-6">
                    <h3 className="mb-2">You might also like</h3>
                    <br />
                    <ShowGrid shows={randomShows} />
                </div>
            </Container>
            <br />
        </>
    );
}
