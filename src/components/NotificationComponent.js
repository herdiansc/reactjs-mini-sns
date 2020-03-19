import React from 'react';

import { connect } from "react-redux";

const mapStateToProps = state => {
    return { writeAccessResponseCode: state.writeAccessResponseCode };
};

class Notification extends React.Component {
    render() {
        let alertHtml, alertType, alertTitle, alertBody;
        if (this.props.writeAccessResponseCode !== 0) {
            if (this.props.writeAccessResponseCode === 201 || this.props.writeAccessResponseCode === 200) {
                alertType = 'alert-success';
                alertTitle = 'Success';
                alertBody = (
                    <React.Fragment>
                        <p>The operation is successful. However json placeholder is read only, so all non read only access will be mocked up by json placeholder</p>
                        <hr />
                        <p className="mb-0">Thus, the bellow actual content doesn't updated</p>
                    </React.Fragment>
                );
            } else {
                alertType = 'alert-danger';
                alertTitle = 'Failed';
                alertBody = <p>Server responded with code {this.props.writeAccessResponseCode}</p>
            }
            alertHtml = (
                <div className={`alert ${alertType}`} role="alert">
                    <h4 className="alert-heading">{alertTitle}</h4>
                    {alertBody}
                </div>
            )
        } else {
            alertHtml = '';
        }
        return alertHtml;
    }
}

const NotificationComponent = connect(mapStateToProps)(Notification);
export default NotificationComponent;