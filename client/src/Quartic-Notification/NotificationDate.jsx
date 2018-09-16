import React from 'react';

const notificationDateStyle = {
    padding: "0.7rem",
    color: "grey",
    fontSize: "1.5rem",
    fontFamily: "inherit",
    borderBottom : "inherit"
};

export const NotificationDate = (props) => {
    let date = props.date;
    let options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' };
    let dateString = date.toLocaleString('en-US', options);
    return (
        <div style={notificationDateStyle}>
            {dateString}
        </div>
    );
};