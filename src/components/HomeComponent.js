import React from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="jumbotron jumbotron-fluid bg-kumparan">
                            <div className="container">
                                <h1 className="display-4">JSON Server Client App</h1>
                                <p className="lead">This is a client app to show built-in json server resources. Developed using react js.</p>
                                <hr className="my-4" />
                                <Link to={`/user`} className="btn btn-primary btn-lg" role="button">Explore</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeComponent;