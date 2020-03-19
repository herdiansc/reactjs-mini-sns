import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUsers } from '../actions';

const mapStateToProps = state => {
    return { items: state.users };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: payload => dispatch(getUsers(payload))
    };
}

class Users extends React.Component {
    componentDidMount() {
        this.props.getUsers({});
    }

    breadcrumb() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Users</li>
                </ol>
            </nav>
        )
    }

    render() {
        return (
            <div className="container">
                { this.breadcrumb() }
                <div className="row">
                    <div className="col-md-12">
                        <div className="albums mt-4 mb-4 pt-4 pb-4">
                            <h3 className="">Users</h3>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="list-group">
                                        {this.props.items.map((item, i) => {
                                            return (
                                                <Link key={i} to={`/user/detail/${item.id}`} className="list-group-item list-group-item-action">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{ item.name }</h5>
                                                        <small>@{ item.username }</small>
                                                    </div>
                                                    <p className="mb-1"><span className="font-weight-bolder">Alamat:</span> { item.address.street } { item.address.suite } { item.address.city } { item.address.zipcode }</p>
                                                    <small><span className="font-weight-bolder">Tel:</span> { item.phone }, <span className="font-weight-bolder">Email:</span> { item.email }</small>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const UsersComponent = connect(mapStateToProps, mapDispatchToProps)(Users);
export default UsersComponent;