import React, { Fragment, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import { formatDate } from '../common/util';

export default function DateSelector(props) {
    const { dates, onDateChange } = props;

    const [selectedDate, setSelectedDate] = useState();

    const handleDateChange = date => {
        setSelectedDate(date);
        onDateChange(date);
    };

    if (!dates.length)
        return (
            <div className="d-flex overflow-scroll">
                <ButtonGroup role={'group'} aria-label={'Choose a date'}>
                    <ToggleButton
                        key={'loading'}
                        id={`radio-loading`}
                        type="radio"
                        variant={'outline-secondary'}
                        name="date"
                        value={'loading'}
                        checked={false}
                        onChange={() => {}}
                        disabled>
                        <span className="text-nowrap">No dates available</span>
                    </ToggleButton>
                </ButtonGroup>
            </div>
        );

    return (
        <div className="d-flex overflow-scroll">
            <ButtonGroup role={'group'} aria-label={'Choose a date'}>
                {dates.map(date => {
                    return (
                        <Fragment key={date}>
                            <ToggleButton
                                key={date}
                                id={`radio-${date}`}
                                data-testid={`date-${date}`}
                                type="radio"
                                variant={selectedDate === date ? 'outline-primary' : 'outline-secondary'}
                                name="date"
                                value={date}
                                checked={selectedDate === date}
                                onChange={() => handleDateChange(date)}>
                                <span className="text-nowrap">{formatDate(date)}</span>
                            </ToggleButton>
                        </Fragment>
                    );
                })}
            </ButtonGroup>
        </div>
    );
}
