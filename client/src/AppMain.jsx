import React from 'react';
import PropTypes from 'prop-types';
import {
    AppBar,
    Toolbar,
    IconButton,
    Badge,
    Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {withStyles} from '@material-ui/core/styles';
import NotificationMain from "./Quartic-Notification/NotificationMain";
import socketIOClient from "socket.io-client";

const styles = theme => ({
    root: {
        width: '100%',
        position: "relative"
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
});

const handleFirstTab = (e) => {
    if (e.keyCode === 9) { // the "I am a keyboard user" key Tab keyCode
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
};

const socket = socketIOClient("/");

class AppMain extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isNotificationMenuOpen: false,
            totalNotifications: [],
            incomingNotifications:true,
            count: [
                {
                    data: 0,
                    label: "Notifications"
                },
                {
                    data: 0,
                    label: "Assigned Tasks"
                },
                {
                    data: 0,
                    label: "Reminders"
                }
            ]
        };
    }
    componentWillMount() {
        window.addEventListener('keydown', handleFirstTab);
        socket.on("FromAPI", data => this.increaseState(data));
    }

    increaseState = (data) => {
        data = {
            notificationDate: new Date(data.notificationDate),
            ...data
        };
        let state = this.state;
        state.totalNotifications.push(data);
        this.modifyCount(data.type,"increase",state);
        this.setState({
            state
        })
    };

    removeNotification = (key, uuid) => {
        let state = this.state;
        state.totalNotifications = state.totalNotifications.filter(item => {
            return (item.key !== uuid);
        });
        this.modifyCount(key, "decrease", state);
        this.setState({
            state
        })
    };

    modifyCount = (key, action, state) => {
        let mapping = {"notifications": 0, "tasks": 1, "reminders": 2};
        let operation = 1;
        if (action === "decrease") {
            operation = -1;
        }
        state.count[mapping[key]].data += operation;
    };

    openNotificationMenu = () => {
        this.setState({isNotificationMenuOpen: !this.state.isNotificationMenuOpen})
    };

    toggleNotifications = () => {
        if(this.state.incomingNotifications) {
            socket.disconnect();
        }
        this.setState({incomingNotifications:false})
    };

    render(){
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon/>
                        </IconButton>
                        <div className={classes.grow}/>
                        <div>
                            <IconButton
                                id="notification"
                                color="inherit"
                                onClick={this.openNotificationMenu}
                            >
                                <Badge className={classes.margin} badgeContent={this.state.totalNotifications.length}
                                       color="secondary">
                                    <NotificationsIcon/>
                                </Badge>
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
                {
                    this.state.isNotificationMenuOpen
                    &&
                    <NotificationMain
                        count={this.state.count}
                        notifications={this.state.totalNotifications}
                        removeNotification={this.removeNotification}
                    />
                }
                <div className="toggleNotification">
                    <Button disabled={!this.state.incomingNotifications} onClick={this.toggleNotifications} variant='contained'>
                        Stop Notifications
                    </Button>
                </div>
            </div>
        );
    }
}

AppMain.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppMain);