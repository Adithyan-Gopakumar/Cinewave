import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import DateSelector from './DateSelector';

const mockDates = ['2024-03-25'];

describe('DateSelector', () => {
    it('should render without errors', () => {
        const mockOnSelectDate = jest.fn();
        render(<DateSelector dates={mockDates} onDateChange={mockOnSelectDate} />);
    });

    it('should call the onDateChange function when a date is selected', () => {
        const mockOnSelectDate = jest.fn();
        render(<DateSelector dates={mockDates} onDateChange={mockOnSelectDate} />);
        const dateButton = screen.getByText('Mon, 25 Mar 2024');
        fireEvent.click(dateButton);
        expect(mockOnSelectDate).toHaveBeenCalled();
    });
});
