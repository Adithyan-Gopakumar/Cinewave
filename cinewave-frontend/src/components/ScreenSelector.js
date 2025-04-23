import React, { Fragment, useState } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

export default function ScreenSelector(props) {
    const { screens, onScreenChange } = props;

    const [selectedScreen, setSelectedDate] = useState();

    const handleScreenChange = screen => {
        setSelectedDate(screen);
        onScreenChange(screen);
    };

    if (!screens.length)
        return (
            <div className="d-flex overflow-scroll">
                <ButtonGroup role={'group'} aria-label={'Choose a date'}>
                    <ToggleButton
                        key={'loading'}
                        id={`radio-loading`}
                        type="radio"
                        variant={'outline-secondary'}
                        name="screen"
                        value={'loading'}
                        checked={false}
                        onChange={() => {}}
                        disabled>
                        <span className="text-nowrap">No screens available</span>
                    </ToggleButton>
                </ButtonGroup>
            </div>
        );

    return (
        <div className="d-flex overflow-scroll">
            <ButtonGroup role={'group'} aria-label={'Choose a date'}>
                {screens.map(screen => {
                    return (
                        <Fragment key={screen.id}>
                            <ToggleButton
                                key={screen.id}
                                id={`radio-${screen.id}`}
                                data-testid={`screen-${screen.id}`}
                                type="radio"
                                variant={selectedScreen?.id === screen.id ? 'outline-primary' : 'outline-secondary'}
                                name="screen"
                                value={screen.id}
                                checked={selectedScreen?.id === screen.id}
                                onChange={() => handleScreenChange(screen)}>
                                <span className="text-nowrap">{screen.screen_name}</span>
                            </ToggleButton>
                        </Fragment>
                    );
                })}
            </ButtonGroup>
        </div>
    );
}
