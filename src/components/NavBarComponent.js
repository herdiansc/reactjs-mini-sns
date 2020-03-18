import React from 'react';
import { Link } from 'react-router-dom';

class NavBarComponent extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-kumparan">
                <Link to="/" className="navbar-brand">JSON Server</Link>
            </nav>
        );
    }
}

export default NavBarComponent;