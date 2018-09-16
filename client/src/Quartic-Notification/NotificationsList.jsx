import React from 'react'
import {NotificationSnippet} from "./NotificationSnippet";

export const NotificationList = (props) => {
        let notificationlist = [];
        const {notifications, buttonBehaviour, removeNotification} = props;
        notifications.sort((a, b) => {
            return b.notificationDate - a.notificationDate;
        });
        notifications.forEach((item)=>{
           notificationlist.push(
               <NotificationSnippet
                   key={item.key}
                   uuid={item.key}
                   type={item.type}
                   notificationDate={item.notificationDate}
                   notificationText={item.notificationText}
                   notificationAction={item.notificationAction}
                   buttonBehaviour={buttonBehaviour}
                   removeNotification={removeNotification}
               />
           )
        });
        return notificationlist;
};