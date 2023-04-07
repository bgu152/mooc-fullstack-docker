import React from 'react';

const Notification = ({ message }: { message: Message | null }) => {
    if (message === null) {
        return null;
    } else if (message.type === 'error') {
        return <div className="error">{message.body}</div>;
    } else {
        return <div className="ok-notification">{message.body}</div>;
    }
};

export default Notification;
