import React from 'react';
import {NotificationDate} from "./NotificationDate";
import {NotificationBriefHeading} from "./NotificationBriefHeading";
import "./less/NotificationMain.less";
import {NotificationList} from "./NotificationsList";

export default class App extends React.Component {

    buttonBehaviour = (e) => alert(e.target.innerText);

    render() {
        return (
            <div className="notificationMain">
                <NotificationDate date={new Date()}/>
                <NotificationBriefHeading data={this.props.count} buttonBehaviour={this.buttonBehaviour}/>
                <NotificationList
                    notifications={this.props.notifications}
                    buttonBehaviour={this.buttonBehaviour}
                    removeNotification={this.props.removeNotification}
                />
            </div>
        );
    }
}