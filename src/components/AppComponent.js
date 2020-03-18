import React from 'react';

import ProgressBarComponent from './ProgressBarComponent.js';
import NavBarComponent from './NavBarComponent.js';

export default class AppComponent extends React.Component {
    render() {
        return (
            <div className="container">
            	<ProgressBarComponent />
                <NavBarComponent />
                { this.props.children }
            </div>
        );
    }
}