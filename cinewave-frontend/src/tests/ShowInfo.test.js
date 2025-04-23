import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { ShowInfo } from '../components/ShowInfo';

let show = {
    id: 2,
    genre: 'action, sci-fi, drama',
    poster: 'https://res.cloudinary.com/ellegacy/image/upload/v1706901383/ai-generated-8490484_640_umtdza.jpg',
    title: 'something else',
    rating: 3.5,
    release_date: '2024-04-12 00:00:00',
    duration_minutes: 300,
    language: 'English',
    cast: 'Abraham Linlcon, Idris Elba',
    about: 'this is an about'
};

describe('ShowInfo', () => {
    test.only('show info component fails to render successfully', () => {
        const originalError = console.error;
        console.error = jest.fn();

        expect(() =>
            render(
                <Router>
                    <ShowInfo />
                </Router>
            )
        ).toThrowError('Show not found!');

        console.error = originalError;
    });

    test.only('show info component renders successfully', () => {
        render(
            <Router>
                <ShowInfo show={show} />
            </Router>
        );
    });
});
