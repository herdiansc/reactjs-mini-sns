import React from 'react';

import ProgressBarComponent from './ProgressBarComponent.js';
import NotificationComponent from './NotificationComponent.js';
import NavBarComponent from './NavBarComponent.js';

export default class AppComponent extends React.Component {
    render() {
        return (
            <div className="container">
            	<ProgressBarComponent />
                <NotificationComponent />
                <NavBarComponent />
                { this.props.children }
            </div>
        );
    }
}