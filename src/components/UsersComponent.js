import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUsers, createUser } from '../actions';
import NotificationComponent from './NotificationComponent.js'

const mapStateToProps = state => {
    return { users: state.users };
};

const mapDispatchToProps = dispatch => {
    return {
        getUsers: () => dispatch(getUsers()),
        createUser: payload => dispatch(createUser(payload))
    };
}

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormShown: false
        };
        this.name = React.createRef();
        this.username = React.createRef();
        this.email = React.createRef();
        this.phone = React.createRef();
        this.city = React.createRef();
        this.suite = React.createRef();
        this.zipcode = React.createRef();
        this.website = React.createRef();
        this.street = React.createRef();
        this.lat = React.createRef();
        this.long = React.createRef();
    }
    componentDidMount() {
        this.props.getUsers();
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

    handleShowUserForm(isShown, e) {
        this.setState({isFormShown: isShown})
    }

    formCreateUser() {
        if (this.state.isFormShown) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <form className="border mb-4 mt-4 p-4">
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Name" ref={this.name} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Username" ref={this.username} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Email" ref={this.email} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Website" ref={this.website} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Phone" ref={this.phone} />
                                </div>
                            </div>
                            <hr />
                            <div className="form-row mb-4 mt-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Street" ref={this.street} />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Suite" ref={this.suite} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Lat" ref={this.lat} />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Long" ref={this.long} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="City" ref={this.city} />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Zipcode" ref={this.zipcode} />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col">
                                    <div className="btn-group float-right" role="group">
                                        <button type="button" className="btn bg-default border"  onClick={(e) => this.handleShowUserForm(false, e)}>Cancel</button>
                                        <button type="button" className="btn text-white bg-kumparan" onClick={(e) => this.handleSubmitUserForm(e)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    handleSubmitUserForm(e) {
        this.props.createUser({
            name: this.name.current.value,
            username: this.username.current.value,
            email: this.email.current.value,
            address: {
                street: this.street.current.value,
                suite: this.suite.current.value,
                city: this.city.current.value,
                zipcode: this.zipcode.current.value,
                geo: {
                    lat: "-38.2386",
                    lng: "57.2232"
                }
            },
            phone: this.phone.current.value,
            website: this.website.current.value,
        })
        .then(() => {
            this.props.getUsers();
        });
        this.handleShowUserForm(false);
    }

    render() {
        return (
            <div className="container">
                { this.breadcrumb() }
                <div className="row">
                    <div className="col-md-12">
                        <div className="albums mt-4 mb-4 pt-4 pb-4">
                            <div className="row">
                                <div className="col-md-6"><h3 className="">Users</h3></div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-sm text-white bg-kumparan float-right" onClick={(e) => { this.handleShowUserForm(true, e)}}>Add</button>
                                </div>
                            </div>
                            
                            <NotificationComponent />
                            { this.formCreateUser() }

                            <div className="row">
                                <div className="col-md-12">
                                    <div className="list-group">
                                        {this.props.users.map((item, i) => {
                                            return (
                                                <Link to={`/user/detail/${item.id}`} key={i} className="list-group-item list-group-item-action">
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