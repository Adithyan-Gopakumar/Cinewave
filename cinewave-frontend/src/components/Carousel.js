import React, { useMemo } from 'react';
import { Carousel } from 'react-bootstrap';
import './Carousel.css';
import { moviesApi } from '../queries/movies';

const MovieCarousel = () => {
    const { data: trendingMovies } = moviesApi.useList();

    // Pick three random movies from the trendingMovies array
    const randomMovies = useMemo(() => {
        if (!trendingMovies) return [];

        const randomMovies = [];
        while (randomMovies.length < 3) {
            const randomIndex = Math.floor(Math.random() * trendingMovies?.length);
            const randomMovie = trendingMovies[randomIndex];
            if (!randomMovies.includes(randomMovie)) {
                randomMovies.push(randomMovie);
            }
        }
        return randomMovies;
    }, [trendingMovies]);

    if (!randomMovies.length) {
        return null;
    }

    return (
        <Carousel>
            {randomMovies.map(movie => (
                <Carousel.Item key={movie.id}>
                    <img className="d-block w-100" src={movie.banner} alt={movie.title} />
                    <Carousel.Caption>
                        <h2>{movie.title}</h2>
                        <p>{movie.about}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default MovieCarousel;
