import React, { Fragment, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import { formatTime } from '../common/util';

export default function ShowTimeSelector(props) {
    const { showTimes, onShowTimeChange } = props;

    const [selectedShowTime, setSelectedShowTime] = useState();

    const handleShowTimeChange = showTime => {
        setSelectedShowTime(showTime);
        onShowTimeChange(showTime);
    };

    if (!showTimes.length)
        return (
            <div className="d-flex overflow-scroll">
                <ButtonGroup role={'group'} aria-label={'Choose a show time'}>
                    <ToggleButton
                        key={'loading'}
                        id={`radio-loading`}
                        type="radio"
                        variant={'outline-secondary'}
                        name="showtime"
                        value={'loading'}
                        checked={false}
                        onChange={() => {}}
                        disabled>
                        <span className="text-nowrap">No show times available</span>
                    </ToggleButton>
                </ButtonGroup>
            </div>
        );

    return (
        <div className="d-flex overflow-scroll">
            <ButtonGroup role={'group'} aria-label={'Choose a show time'}>
                {showTimes.map(showTime => {
                    return (
                        <Fragment key={showTime.id}>
                            <ToggleButton
                                key={showTime.id}
                                id={`radio-${showTime.id}`}
                                data-testid={`showtime-${showTime.id}`}
                                type="radio"
                                variant={selectedShowTime?.id === showTime.id ? 'outline-primary' : 'outline-secondary'}
                                name="showtime"
                                value={showTime.id}
                                checked={selectedShowTime?.id === showTime.id}
                                onChange={() => handleShowTimeChange(showTime)}>
                                <span className="text-nowrap">{formatTime(showTime.time)}</span>
                            </ToggleButton>
                        </Fragment>
                    );
                })}
            </ButtonGroup>
        </div>
    );
}
