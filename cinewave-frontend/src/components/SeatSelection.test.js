import React from 'react';
import { act, render, screen } from '@testing-library/react';
import SeatSelection, { SeatQuantitySelector } from './SeatSelection';

const mockScreen = {
    executive_seat_cost: '12.00',
    executive_seat_count: 30,
    id: 5,
    normal_seat_cost: '10.00',
    normal_seat_count: 40,
    premium_seat_cost: '16.00',
    premium_seat_count: 25,
    screen_name: 'Screen 1'
};

describe('SeatSelection', () => {
    test('renders SeatSelection component', () => {
        const mockOnSeatCountChange = jest.fn();

        render(<SeatSelection screen={mockScreen} onSeatCountChange={() => mockOnSeatCountChange} />);

        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
        expect(screen.getByText('40')).toBeInTheDocument();

        expect(screen.getByText('premium')).toBeInTheDocument();
        expect(screen.getByText('executive')).toBeInTheDocument();
        expect(screen.getByText('normal')).toBeInTheDocument();

        expect(screen.getByText('(£16.00)')).toBeInTheDocument();
        expect(screen.getByText('(£12.00)')).toBeInTheDocument();
        expect(screen.getByText('(£10.00)')).toBeInTheDocument();
    });
});

describe('SeatQuantitySelector', () => {
    test('renders SeatQuantitySelector component', () => {
        const mockOnSeatCountChange = jest.fn();

        render(
            <SeatQuantitySelector
                seatType={'premium'}
                availableSeatCount={'10'}
                seatCost={'20'}
                onSeatCountChange={mockOnSeatCountChange}
            />
        );

        expect(screen.getByText('10')).toBeInTheDocument();
        expect(screen.getByText('premium')).toBeInTheDocument();
        expect(screen.getByText('(£20.00)')).toBeInTheDocument();

        // Click the increment button
        act(() => {
            screen.getByTestId('increment-button').click();
        });
        expect(mockOnSeatCountChange).toHaveBeenCalledTimes(2);
        expect(mockOnSeatCountChange).toHaveBeenCalledWith('premium', 1);

        // Click the decrement button
        act(() => {
            screen.getByTestId('decrement-button').click();
        });
        expect(mockOnSeatCountChange).toHaveBeenCalledTimes(3);
        expect(mockOnSeatCountChange).toHaveBeenCalledWith('premium', 0);
    });
});
