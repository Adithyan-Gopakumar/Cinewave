import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ShowTimeSelector from './ShowTimeSelector';

const mockShowTimes = [
    {
        date: '2024-03-25',
        id: 1,
        movie: {
            about: 'Test about',
            cast: 'Test cast',
            duration_minutes: 100,
            genre: 'Test genre',
            id: 1,
            language: 'English',
            rating: '5',
            release_date: '2024-03-01',
            title: 'Test Movie'
        },
        screen: {
            executive_seat_cost: '12.00',
            executive_seat_count: 30,
            id: 1,
            normal_seat_cost: '10.00',
            normal_seat_count: 40,
            premium_seat_cost: '20.00',
            premium_seat_count: 28,
            screen_name: 'Screen 1'
        },
        time: '13:00:00'
    }
];

describe('ShowTimeSelector', () => {
    it('renders the component without errors', () => {
        const mockOnShowTimeChange = jest.fn();
        render(<ShowTimeSelector showTimes={mockShowTimes} onShowTimeChange={mockOnShowTimeChange} />);
    });

    it('displays the correct show times', () => {
        const mockOnShowTimeChange = jest.fn();
        render(<ShowTimeSelector showTimes={mockShowTimes} onShowTimeChange={mockOnShowTimeChange} />);
        expect(screen.getByText('1:00 PM')).toBeInTheDocument();
    });

    it('calls the onShowTimeChange function when a time is selected', () => {
        const mockOnShowTimeChange = jest.fn();
        render(<ShowTimeSelector showTimes={mockShowTimes} onShowTimeChange={mockOnShowTimeChange} />);
        fireEvent.click(screen.getByTestId('showtime-1'));
        expect(mockOnShowTimeChange).toHaveBeenCalledWith(mockShowTimes[0]);
    });
});
