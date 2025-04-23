import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ShowGridItem } from '../components/ShowGridItem.js';
import { BrowserRouter as Router } from 'react-router-dom';

let show = {
    id: 1,
    genre: 'action, sci-fi, drama',
    poster: 'https://res.cloudinary.com/ellegacy/image/upload/v1706901383/ai-generated-8490484_640_umtdza.jpg',
    title: 'something',
    rating: 4.5
};

describe('ShowGridItem', () => {
    test.only('grid item component fails to render successfully', () => {
        const originalError = console.error;
        console.error = jest.fn();

        expect(() =>
            render(
                <Router>
                    <ShowGridItem />
                </Router>
            )
        ).toThrowError('Show is missing!');

        console.error = originalError;
    });

    test('renders grid item component without errors', () => {
        render(
            <Router>
                <ShowGridItem show={show} key={show.id} />
            </Router>
        );
    });

    test('successfully navigate to show details page', () => {
        const { getByText } = render(
            <Router>
                <ShowGridItem show={show} key={show.id} />
            </Router>
        );

        const button = getByText(show.title);
        fireEvent.click(button);

        expect(window.location).toHaveProperty('pathname', '/show/' + show.id);
    });
});
