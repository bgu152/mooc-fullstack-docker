import React, { useState, useImperativeHandle, Ref, forwardRef } from 'react';

interface TogglableProps {
    buttonLabel: string;
    children: React.ReactNode;
}

interface RefObject {
    toggleVisibility: () => void;
}

const Togglable = forwardRef(
    ({ buttonLabel, children }: TogglableProps, ref: Ref<RefObject>) => {
        const [visible, setVisible] = useState(false);

        const hideWhenVisible = { display: visible ? 'none' : '' };
        const showWhenVisible = { display: visible ? '' : 'none' };

        const toggleVisibility = () => {
            setVisible(!visible);
        };

        useImperativeHandle(ref, () => {
            return {
                toggleVisibility,
            };
        });

        return (
            <div style={{marginBottom:'1rem'}}>
                <div style={hideWhenVisible}>
                    <button onClick={toggleVisibility}>{buttonLabel}</button>
                </div>
                <div style={showWhenVisible}>
                    {children}
                    <button onClick={toggleVisibility}>cancel</button>
                </div>
            </div>
        );
    }
);

Togglable.displayName = 'Togglable';

export default Togglable;
