import React from "react";

const notificationSnippetStyle = {
    mainDiv: {
        position: "relative",
        padding: "1rem",
        color: "grey",
        fontSize: "0.75rem"
    },
    removeNotification: {
        position: "absolute",
        border: "none",
        backgroundColor: "white",
        top: "0.25rem",
        right: "0.25rem"
    },
    modifiedDate: {
        color: "black",
        fontWeight: "bold",
        marginBottom: "0.5rem"
    }
};

export const NotificationSnippet = (props) => {

    const modifyDate = (notificationDate) => {
        notificationDate = new Date(notificationDate);
        let now = new Date();
        let oneMinute = 60 * 1000;
        let oneHour = 60 * 60 * 1000;
        let oneDay = 24 * 60 * 60 * 1000;
        let options = {year: 'numeric', month: 'short', day: 'numeric'};
        let difference = (now - notificationDate);
        if (difference < oneMinute) {
            return "Just Now"
        }
        else if (difference < oneHour) {
            return parseInt((difference / oneMinute), 10) + " minutes ago";
        }
        else if (difference < oneDay) {
            return parseInt((difference / oneHour), 10) + " hours ago";
        }
        else if (difference > oneDay && difference < (2 * oneDay)) {
            return "Yesterday";
        }
        else {
            return (notificationDate).toLocaleDateString('en-US', options);
        }
    };

    const {uuid, type, notificationDate, notificationText, notificationAction, buttonBehaviour, removeNotification} = props;

    return (
        <div style={notificationSnippetStyle.mainDiv}>
            <button style={notificationSnippetStyle.removeNotification} onClick={()=>removeNotification(type,uuid)}>X
            </button>
            <div style={notificationSnippetStyle.modifiedDate}>{modifyDate(notificationDate)}</div>
            <div>
                {notificationText}
                <button className="linkStyle" onClick={buttonBehaviour}>{notificationAction} ></button>
            </div>
        </div>
    )
};
