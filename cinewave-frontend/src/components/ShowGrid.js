import React from 'react';
import { ShowGridItem } from './ShowGridItem';

export default function ShowGrid({ shows }) {
    if (shows == null) {
        return;
    } else if (shows === undefined) {
        throw new Error('Shows value is missing!');
    }

    return (
        <div className="container-fluid p-0">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {shows.map(show => {
                    return <ShowGridItem show={show} key={show.id} />;
                })}
            </div>
        </div>
    );
}
