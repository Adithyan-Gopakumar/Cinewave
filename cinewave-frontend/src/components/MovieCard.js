import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

import { formatDate } from '../common/util';

export default function MovieCard({ movie }) {
    return (
        <Card>
            <Card.Img src={movie.poster} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>
                    <small>{movie.genre}</small>
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>
                    <small>Cast</small>
                    <br />
                    <span>{movie.cast}</span>
                </ListGroup.Item>
                <ListGroup.Item>
                    <small>Release Date</small>
                    <br />
                    {formatDate(movie.release_date)}
                </ListGroup.Item>
                <ListGroup.Item>
                    <small>Language</small>
                    <br />
                    {movie.language}
                </ListGroup.Item>
            </ListGroup>
        </Card>
    );
}
