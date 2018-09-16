import React from 'react';

const notificationBriefHeading = {
    padding: "0.6rem",
    color: "grey",
    borderBottom : "inherit"
};

const summaryLineStyle = {
    main: {
        display: "flex",
        alignItems: "center",
        fontFamily: "inherit"
    },
    data:{
        color: "lightBlue",
        fontSize: "2.25rem",
        margin: "0.5rem",
        flex: 5,
        textAlign: "right"
    },
    label:{
        color: "grey",
        fontSize: "0.85rem",
        flex: 7,
        margin: "0.5rem",
        fontWeight: "bold",
        textAlign: "left"
    }
};

export const NotificationBriefHeading = (props) => {
    return (
        <div style={notificationBriefHeading}>
            {
                props.data.map((item, index) => {
                    return (
                        <div style={summaryLineStyle.main} key={index}>
                            <p style={summaryLineStyle.data}>{item.data}</p>
                            <p style={summaryLineStyle.label}>{item.label}</p>
                        </div>
                    );
                })
            }
            <div style={{textAlign:"center"}}>
                <button className="linkStyle" onClick={props.buttonBehaviour}>My Workspace ></button>
            </div>
        </div>
    );
};