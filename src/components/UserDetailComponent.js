import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUserDetail, getAlbums, getPosts, createPost, deleteUser, editUser } from '../actions';

const mapStateToProps = state => {
    return { user: state.user, albums: state.albums, posts: state.posts };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: payload => dispatch(getUserDetail(payload)),
        getAlbums: payload => dispatch(getAlbums(payload)),
        getPosts: payload => dispatch(getPosts(payload)),
        createPost: payload => dispatch(createPost(payload)),
        deleteUser: payload => dispatch(deleteUser(payload)),
        editUser: payload => dispatch(editUser(payload))
    };
}

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormShown: false,
            isUserFormShown: false,
            postBody: '',
            postTitle: '',
            user: {
                // name: '',
                username: '',
                email: '',
                address: {
                    street: '',
                    suite: '',
                    city: '',
                    zipcode: '',
                    geo: {
                        lat: '',
                        lng: ''
                    }
                },
                phone: '',
                website: '',
            }
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
        let { match: { params } } = this.props;
        this.loadUser(params.user_id);
        this.props.getAlbums(params.user_id);
        this.props.getPosts(params.user_id);
    }

    loadUser(userId) {
        this.props.getUserDetail(userId)
        .then(()=>{
            this.name.current.value = this.props.user.name;
            this.username.current.value = this.props.user.username;
            this.street.current.value = this.props.user.address.street;
            this.suite.current.value = this.props.user.address.suite;
            this.city.current.value = this.props.user.address.city;
            this.zipcode.current.value = this.props.user.address.zipcode;
            this.lat.current.value = this.props.user.address.geo.lat;
            this.long.current.value = this.props.user.address.geo.long;
            this.phone.current.value = this.props.user.phone;
            this.website.current.value = this.props.user.website;
        });
    }

    breadcrumb() {
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/user`}>Users</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{ this.props.user.name }</li>
                </ol>
            </nav>
        )
    }

    formCreatePost() {
        if (this.state.isFormShown) {
            return (
                <div className="row">
                    <div className="col-md-12">
                        <form className="border mb-4 mt-4 p-4">
                            <div className="form-row mb-4">
                                <div className="col">
                                    <textarea className="form-control" placeholder="Body" name="postBody" value={this.state.postBody} onChange={(e) => this.handleInputChange(e)}></textarea>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-md-8">
                                    <input type="text" className="form-control" placeholder="Title" value={this.state.postTitle} name="postTitle" onChange={(e) => this.handleInputChange(e)} />
                                </div>
                                <div className="col">
                                    <div className="btn-group float-right" role="group">
                                        <button type="button" className="btn bg-default border"  onClick={(e) => this.handleShowPostForm(false, e)}>Cancel</button>
                                        <button type="button" className="btn text-white bg-kumparan" onClick={(e) => this.handleSubmitPostForm(e)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        }
    }

    handleShowPostForm(isShown, e) {
        this.setState({isFormShown: isShown})
    }

    handleSubmitPostForm(e) {
        e.preventDefault();
        this.props.createPost({
            body: this.state.postBody,
            title: this.state.postTitle,
            userId: this.props.user.id
        })
        this.handleShowPostForm(false);
    }

    handleInputChange(e) {
        this.setState({[e.target.name]:e.target.value})
    }

    handleDeleteUser(userId) {
        this.props.deleteUser(userId)
        .then(() => {
            this.props.history.push("/user");
        });
    }

    handleSubmitUserForm(e) {
        this.props.editUser({
            id: this.props.user.id,
            data:{
                name: this.name.current.value,
                username: this.username.current.value,
                email: this.email.current.value,
                address: {
                    street: this.street.current.value,
                    suite: this.suite.current.value,
                    city: this.city.current.value,
                    zipcode: this.zipcode.current.value,
                    geo: {
                        lat: this.lat.current.value,
                        lng: this.long.current.value
                    }
                },
                phone: this.phone.current.value,
                website: this.website.current.value,
            }
        })
        .then(() => {
            this.loadUser(this.props.user.id);
        });
        this.handleShowUserForm(false);
    }

    formEditUser() {
        // if (this.state.isUserFormShown) {
            let displayStyle = this.state.isUserFormShown ? {} : {display:'none'}
            return (
                <div className="row" style={displayStyle}>
                    <div className="col-md-12">
                        <form className="border mb-4 mt-4 p-4">
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Name" ref={this.name} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Username" ref={this.username}  />
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
                                        <button type="button" className="btn bg-default border"  onClick={(e) => this.handleShowUserForm(false)}>Cancel</button>
                                        <button type="button" className="btn text-white bg-kumparan" onClick={(e) => this.handleSubmitUserForm(e)}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )
        // }
    }

    handleShowUserForm(isShown) {
        this.setState({isUserFormShown: isShown})
    }

    showUserText() {
        if (!this.state.isUserFormShown) {
            return (
                <div className="masthead border text-center pt-4 pb-4">
                    <div className="container d-flex align-items-center flex-column">
                        <img className="masthead-avatar mb-5" src="/static/images/avataaars.svg" alt="" />
                        <h1 className="masthead-heading mb-0">{ this.props.user.name }</h1>
                        <p className="masthead-subheading font-weight-light mb-0">
                            { this.props.user.phone } - { this.props.user.email } - { this.props.user.website }
                        </p>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="container">
                { this.breadcrumb() }
                <div className="row">
                    <div className="col-md-12">
                        <div className="post mt-4 mb-4 pt-4 pb-4">
                            <div className="row">
                                <div className="col-md-6"><h3 className="">User</h3></div>
                                <div className="col-md-6">
                                    <div className="btn-group float-right" role="group">
                                        <button type="button" className="btn btn-sm text-white bg-kumparan" onClick={() => this.handleShowUserForm(true)}>Edit</button>
                                        <button type="button" className="btn btn-sm btn-danger"  onClick={() => this.handleDeleteUser(this.props.user.id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            { this.formEditUser() }
                            { this.showUserText() }
                        </div>

                        <div className="albums mt-4 mb-4 pt-4 pb-4">
                            <div className="row">
                                <div className="col-md-6"><h3 className="">Post</h3></div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-sm text-white bg-kumparan float-right" onClick={(e) => { this.handleShowPostForm(true, e)}}>Add</button>
                                </div>
                            </div>
                            
                            { this.formCreatePost() }
                            
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="list-group">
                                        {this.props.posts.map((post, i) => {
                                            return (
                                                <li key={ i } className="list-group-item">
                                                    <Link to={`/post/detail/${post.id}`}>{ post.title }</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="albums mt-4 mb-4 pt-4 pb-4">
                            <h3 className="">Album</h3>
                  
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="list-group">
                                        {this.props.albums.map((album, i) => {
                                            return (
                                                <li key={ i } className="list-group-item">
                                                    <Link to={`/album/detail/${album.id}`}>{ album.title }</Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const UserDetailComponent = connect(mapStateToProps, mapDispatchToProps)(UserDetail);
export default UserDetailComponent;