import React from 'react';
import { connect } from "react-redux";
import { closeNotification } from '../actions';

const mapStateToProps = state => {
    return { writeAccessResponseCode: state.writeAccessResponseCode };
};

const mapDispatchToProps = dispatch => {
    return {
        closeNotification: () => dispatch(closeNotification())
    };
}

class Notification extends React.Component {
    handleCloseNotification() {
        this.props.closeNotification()
    }
    render() {
        let alertHtml, alertType, alertTitle, alertBody;
        if (this.props.writeAccessResponseCode !== 0) {
            if (this.props.writeAccessResponseCode === 201 || this.props.writeAccessResponseCode === 200) {
                alertType = 'alert-success';
                alertTitle = 'Success';
                alertBody = (
                    <React.Fragment>
                        <p>The operation is successful. However json placeholder is read only, so all non read only access will be mocked up by json placeholder</p>
                        <p className="mb-0">Thus, the bellow actual content may not be updated.</p>
                    </React.Fragment>
                );
            } else {
                alertType = 'alert-danger';
                alertTitle = 'Failed';
                alertBody = <p>Server responded with code {this.props.writeAccessResponseCode}</p>
            }
            alertHtml = (
                <div className="fixed-top">
                    <div className="container notif-container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className={`alert ${alertType}`} role="alert">
                                    <h4 className="alert-heading">{alertTitle}</h4>
                                    {alertBody}
                                    <hr />
                                    <button type="button" className="btn btn-sm btn-info mt-4" data-dismiss="alert" aria-label="Close" onClick={()=>this.handleCloseNotification()}>
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else {
            alertHtml = '';
        }
        return alertHtml;
    }
}

const NotificationComponent = connect(mapStateToProps, mapDispatchToProps)(Notification);
export default NotificationComponent;