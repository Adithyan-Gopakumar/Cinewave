export const BASE_URL = 'http://127.0.0.1:8000/';

export const ENDPOINTS = {
    USERS: {
        LOGIN: `users/login/`,
        REGISTER: `users/register/`,
        LIST: `users/all/`
    },
    MOVIES: {
        LIST: `movies/`,
        LIST_TRENDING: `movies/trending/`,
        LIST_UPCOMING: `movies/upcoming/`,
        CREATE: `movies/`,
        UPDATE: movieId => `movies/${movieId}/`,
        REMOVE: movieId => `movies/${movieId}/`,
        DETAIL: movieId => `movies/${movieId}/`
    },
    BOOKINGS: {
        LIST: `bookings/`,
        LIST_USER_BOOKINGS: `bookings/user/`,
        CREATE: `bookings/`,
        UPDATE: bookingId => `bookings/${bookingId}/`,
        REMOVE: bookingId => `bookings/${bookingId}/`,
        DETAIL: bookingId => `bookings/${bookingId}/`,
        PAYMENT_INTENT: `bookings/payment_intent/`
    },
    SCREENS: {
        LIST: `screens/`,
        CREATE: `screens/`,
        UPDATE: screenId => `screens/${screenId}/`,
        REMOVE: screenId => `screens/${screenId}/`,
        DETAIL: screenId => `screens/${screenId}/`
    },
    SHOW_TIMINGS: {
        LIST: `show_timings/`,
        CREATE: `show_timings/`,
        UPDATE: showTimingId => `show_timings/${showTimingId}/`,
        REMOVE: showTimingId => `show_timings/${showTimingId}/`,
        DETAIL: showTimingId => `show_timings/${showTimingId}/`
    }
};
