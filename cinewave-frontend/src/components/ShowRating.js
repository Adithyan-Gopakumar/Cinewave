import React from 'react';
import { ShowRatingItem } from './ShowRatingItem';

export function ShowRating({ rating }) {
    function rateShow(rating) {
        let ratingIcons = [];

        for (let i = 0; i < 5; i++) {
            ratingIcons.push(<ShowRatingItem key={i} rating={rating--} />);
        }

        return ratingIcons;
    }

    return (
        <div className="d-flex justify-content-start">
            <div className="d-flex" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title={rating}>
                {rateShow(rating).map(showRating => {
                    return showRating;
                })}
            </div>

            <div>
                <p className="card-text ps-2 text-secondary">Rating</p>
            </div>
        </div>
    );
}
