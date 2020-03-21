import React from 'react';
import { Link } from 'react-router-dom';

class HomeComponent extends React.Component {
    render() {
        return (
            <div className="search-form-container">
                <div className="row search-form" style={{"display":"block", "textAlign":"center"}}>
                    <h1>React Mini SNS</h1>
                    <hr />
                    <p>
                        This is a client app to show built-in json placeholder resources.<br />
                        Developed using react js and react-redux.
                    </p>
                    <Link to={`/user`} className="btn bg-kumparan text-white btn-sm">Explore</Link>
                </div>
            </div>
        );
    }
}

export default HomeComponent;