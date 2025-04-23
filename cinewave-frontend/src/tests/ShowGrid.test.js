import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import ShowGrid from '../components/ShowGrid';

let shows = [
    {
        id: 1,
        genre: 'action, sci-fi, drama',
        poster: 'https://res.cloudinary.com/ellegacy/image/upload/v1706901383/ai-generated-8490484_640_umtdza.jpg',
        title: 'something',
        rating: 4.5
    },
    {
        id: 2,
        genre: 'action, sci-fi, drama',
        poster: 'https://res.cloudinary.com/ellegacy/image/upload/v1706901383/ai-generated-8490484_640_umtdza.jpg',
        title: 'something else',
        rating: 3.5
    }
];

describe('ShowGrid', () => {
    test('grid component fails to render successfully', () => {
        const originalError = console.error;
        console.error = jest.fn();

        expect(() =>
            render(
                <Router>
                    <ShowGrid />
                </Router>
            )
        ).toThrowError('Shows value is missing!');

        console.error = originalError;
    });

    test('grid component renders successfully', () => {
        render(
            <Router>
                <ShowGrid shows={shows} />
            </Router>
        );
    });
});
