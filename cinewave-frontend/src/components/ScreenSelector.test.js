import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ScreenSelector from './ScreenSelector';

const mockScreens = [
    {
        executive_seat_cost: '12.00',
        executive_seat_count: 30,
        id: 1,
        normal_seat_cost: '10.00',
        normal_seat_count: 40,
        premium_seat_cost: '16.00',
        premium_seat_count: 25,
        screen_name: 'Screen 1'
    }
];

describe('ScreenSelector', () => {
    it('should render the component', () => {
        const mockOnSelectScreen = jest.fn();
        render(<ScreenSelector screens={mockScreens} onScreenChange={mockOnSelectScreen} />);
        const screenButton = screen.getByTestId('screen-1');
        expect(screenButton).toBeInTheDocument();
    });

    it('should call the onScreenChange function when a screen is selected', () => {
        const mockOnSelectScreen = jest.fn();
        render(<ScreenSelector screens={mockScreens} onScreenChange={mockOnSelectScreen} />);
        const screenButton = screen.getByTestId('screen-1');
        fireEvent.click(screenButton);
        expect(mockOnSelectScreen).toHaveBeenCalledWith(mockScreens[0]);
    });
});
