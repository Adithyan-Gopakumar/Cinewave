import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import ShowDetails from '../pages/ShowDetails';
import TicketBooking from '../pages/TicketBooking';
import BookingHistory from '../pages/BookingHistory';
import BookingHistoryDetail from '../pages/BookingHistoryDetail';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Profile from '../pages/Profile';

/*Admin Pages*/
import Dashboard from '../pages/admin/Dashboard';

import ScreensList from '../pages/admin/screens/ScreensList';
import AddScreen from '../pages/admin/screens/AddScreen';
import EditScreen from '../pages/admin/screens/EditScreen';

import MovieList from '../pages/admin/movies/MovieList';
import AddMovie from '../pages/admin/movies/AddMovie';
import EditMovie from '../pages/admin/movies/EditMovie';
import MovieDetail from '../pages/admin/movies/MovieDetail';

import ShowTimingsList from '../pages/admin/showTimings/ShowTimingsList';
import AddShowTiming from '../pages/admin/showTimings/AddShowTiming';
import EditShowTiming from '../pages/admin/showTimings/EditShowTiming';

import BookingList from '../pages/admin/bookings/BookingList';
import BookingDetail from '../pages/admin/bookings/BookingDetail';
/*Admin Pages*/

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/show/:showId',
        element: <ShowDetails />
    },
    {
        path: '/show/:showId/book-tickets',
        element: <TicketBooking />
    },
    {
        path: '/booking-history',
        element: <BookingHistory />
    },
    {
        path: '/booking-history/:bookingId',
        element: <BookingHistoryDetail />
    },
    // Admin routes
    {
        path: '/admin/dashboard',
        element: <Dashboard />
    },
    {
        path: '/admin/screens',
        element: <ScreensList />
    },
    {
        path: '/admin/screens/add',
        element: <AddScreen />
    },
    {
        path: '/admin/screens/edit/:screenId',
        element: <EditScreen />
    },
    {
        path: '/admin/movies',
        element: <MovieList />
    },
    {
        path: '/admin/movies/:showId',
        element: <MovieDetail />
    },
    {
        path: '/admin/movies/add',
        element: <AddMovie />
    },
    {
        path: '/admin/movies/edit/:movieId',
        element: <EditMovie />
    },
    {
        path: '/admin/show-timings',
        element: <ShowTimingsList />
    },
    {
        path: '/admin/show-timings/add',
        element: <AddShowTiming />
    },
    {
        path: '/admin/show-timings/edit/:showTimingId',
        element: <EditShowTiming />
    },
    {
        path: '/admin/bookings',
        element: <BookingList />
    },
    {
        path: '/admin/bookings/:bookingId',
        element: <BookingDetail />
    }
]);
