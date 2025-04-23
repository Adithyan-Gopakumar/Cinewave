import React, { forwardRef } from 'react';

import { getErrorClassName } from '../common/util';

const Input = forwardRef((props, ref) => {
    const { label, name, type, error, ...otherProps } = props;

    return (
        <>
            <label htmlFor={name} className={'form-label'}>
                {label}
            </label>
            <input
                ref={ref}
                name={name}
                {...otherProps}
                type={type}
                className={`form-control ${getErrorClassName(error)}`}
            />
            <div id={`${name}Feedback`} className={'invalid-feedback'}>
                {error?.message}
            </div>
        </>
    );
});

export default Input;
