import React, { useEffect, useState } from 'react';
import './SeatSelection.css';
import { formatCurrency } from '../common/util';

export const SeatQuantitySelector = ({ seatType, availableSeatCount, seatCost, onSeatCountChange }) => {
    const [selectedSeatCount, setSelectedSeatCount] = useState(0);

    useEffect(() => {
        onSeatCountChange(seatType, selectedSeatCount);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedSeatCount]);

    const handleDecrement = () => {
        if (selectedSeatCount >= 0) {
            setSelectedSeatCount(prevCount => prevCount - 1);
        }
    };

    const handleIncrement = () => {
        if (selectedSeatCount < availableSeatCount) {
            setSelectedSeatCount(prevCount => prevCount + 1);
        }
    };

    return (
        <div className="rounded border border-primary flex-fill">
            <div className="flex-fill d-flex flex-row justify-content-center border-bottom border-primary p-2">
                <h6 className="text-center">
                    {availableSeatCount}
                    <small className="text-body-secondary">{' seats available'}</small>
                </h6>
            </div>
            <div className="d-flex flex-row">
                <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={handleDecrement}
                    data-testid={'decrement-button'}>
                    <i className="bi bi-dash text-primary"></i>
                </button>
                <div className="flex-fill d-flex flex-row justify-content-center">
                    <h4 className="text-center">{selectedSeatCount}</h4>
                </div>
                <button
                    type="button"
                    className="btn btn-outline-light"
                    onClick={handleIncrement}
                    data-testid={'increment-button'}>
                    <i className="bi bi-plus text-primary"></i>
                </button>
            </div>
            <div className="flex-fill d-flex flex-row justify-content-center border-top border-primary p-2">
                <h6 className="text-capitalize">
                    {seatType}
                    <small>{` (${formatCurrency(seatCost)})`}</small>
                </h6>
            </div>
        </div>
    );
};

export default function SeatSelection({ screen, onSeatCountChange }) {
    const [premiumSeatCount, setPremiumSeatCount] = useState(0);
    const [executiveSeatCount, setExecutiveSeatCount] = useState(0);
    const [normalSeatCount, setNormalSeatCount] = useState(0);

    const handleSeatCountChange = (seatType, seatCount) => {
        switch (seatType) {
            case 'premium':
                setPremiumSeatCount(seatCount);
                onSeatCountChange({
                    premium: seatCount,
                    executive: executiveSeatCount,
                    normal: normalSeatCount
                });
                break;
            case 'executive':
                setExecutiveSeatCount(seatCount);
                onSeatCountChange({
                    premium: premiumSeatCount,
                    executive: seatCount,
                    normal: normalSeatCount
                });
                break;
            case 'normal':
                setNormalSeatCount(seatCount);
                onSeatCountChange({
                    premium: premiumSeatCount,
                    executive: executiveSeatCount,
                    normal: seatCount
                });
                break;
            default:
                break;
        }
    };

    return (
        <div className={'d-flex flex-row gap-2'}>
            <SeatQuantitySelector
                seatType={'premium'}
                availableSeatCount={screen.premium_seat_count}
                seatCost={screen.premium_seat_cost}
                onSeatCountChange={handleSeatCountChange}
            />
            <SeatQuantitySelector
                seatType={'executive'}
                availableSeatCount={screen.executive_seat_count}
                seatCost={screen.executive_seat_cost}
                onSeatCountChange={handleSeatCountChange}
            />
            <SeatQuantitySelector
                seatType={'normal'}
                availableSeatCount={screen.normal_seat_count}
                seatCost={screen.normal_seat_cost}
                onSeatCountChange={handleSeatCountChange}
            />
        </div>
    );
}
