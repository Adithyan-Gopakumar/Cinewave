import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ShowRating } from './ShowRating';
import { ShowGenreItem } from './ShowGenreItem';
import { splitString, formatDate, convertMinsToHours } from '../common/util';

export function ShowInfo({ show, canBookTickets = true }) {
    if (show === undefined) {
        throw new Error('Show not found!');
    }

    const navigate = useNavigate();

    const genres = splitString(show.genre);

    const gotToTicketBooking = e => {
        e.preventDefault();
        navigate(`/show/${show.id}/book-tickets`);
    };

    return (
        <div className="shadow-lg p-3 mb-5 bg-body rounded">
            <div className="card border-0">
                <div className="row g-0">
                    <div className="col-lg-3 col-md-4 col-sm-12">
                        <img src={show.poster} className="img-fluid rounded w-100 h-100" alt="movie poster" />
                    </div>
                    <div className="col-lg-9 col-md-8 col-sm-12">
                        <div className="card-body">
                            <h5 className="card-title">{show.title}</h5>
                            <div className="container-fluid p-0 mb-2">
                                <div className="row">
                                    {genres.map((genre, i) => {
                                        return (
                                            <div key={i} className="card-text col-4">
                                                <a href={'/#'} className="btn btn-link p-0 text-decoration-none">
                                                    <ShowGenreItem genre={genre.trim()} />
                                                </a>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <ShowRating rating={show.rating} />
                            <div className="mt-3">
                                <h6 className="card-title">Release Date</h6>
                                <p className="card-text">{formatDate(show.release_date)}</p>
                            </div>

                            <div className="mt-3">
                                <h6 className="card-title">Runtime</h6>
                                <p className="card-text">{convertMinsToHours(show.duration_minutes)}</p>
                            </div>
                            <div className="mt-3">
                                <h6 className="card-title">Language</h6>
                                <p className="card-text">{show.language}</p>
                            </div>
                            <div className="mt-3">
                                <h6 className="card-title">Cast</h6>
                                <p className="card-text">{show.cast}</p>
                            </div>
                            {canBookTickets && (
                                <div className="mt-3">
                                    <a
                                        onClick={gotToTicketBooking}
                                        className="btn btn-dark text-white fw-bolder fs-5"
                                        href={'/#'}>
                                        Book Tickets&nbsp;
                                        <i className="bi bi-check2-circle"></i>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-12 mt-3 movie-details-synopsis lg-screen">
                        <h6 className="card-title fs-4 mb-2">About Movie</h6>
                        <p className="card-text">{show.about}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
