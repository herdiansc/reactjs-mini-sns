import React from 'react';

import ProgressBarComponent from './ProgressBarComponent.js';
import NotificationComponent from './NotificationComponent.js';

export default class AppComponent extends React.Component {
    render() {
        return (
            <div className="container">
            	<ProgressBarComponent />
                <NotificationComponent />
                { this.props.children }
            </div>
        );
    }
}