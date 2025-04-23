import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ShowRating } from './ShowRating';
import { ShowGenreItem } from './ShowGenreItem';
import { splitString } from '../common/util';

import './ShowGridItem.css';

export function ShowGridItem({ show }) {
    if (show === undefined) {
        throw new Error('Show is missing!');
    }

    const navigate = useNavigate();
    let genres = splitString(show.genre);

    const openShowDetails = e => {
        e.preventDefault();
        navigate(`/show/${show.id}`);
    };

    return (
        <div className="col cursor-pointer" onClick={openShowDetails} id={'movie-' + show.id}>
            <div className="card position-relative">
                <img src={show.poster} className="card-img-top show-grid-item-poster" alt="movie poster" />
                <div className="card-body">
                    <h5 className="card-title">{show.title}</h5>
                    <p className="card-text">
                        {genres.map((genre, i) => {
                            return <ShowGenreItem genre={genre} key={i} />;
                        })}
                    </p>
                    <ShowRating rating={show.rating} />
                </div>
            </div>
        </div>
    );
}
