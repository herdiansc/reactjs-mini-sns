import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUserDetail, getAlbums, getPosts, createPost } from '../actions';
import NotificationComponent from './NotificationComponent.js'

const mapStateToProps = state => {
    return { user: state.user, albums: state.albums, posts: state.posts };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: payload => dispatch(getUserDetail(payload)),
        getAlbums: payload => dispatch(getAlbums(payload)),
        getPosts: payload => dispatch(getPosts(payload)),
        createPost: payload => dispatch(createPost(payload))
    };
}

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormShown: false,
            postBody: '',
            postTitle: ''
        };
    }

    componentDidMount() {
        let { match: { params } } = this.props;
        this.props.getUserDetail(params.user_id);
        this.props.getAlbums(params.user_id);
        this.props.getPosts(params.user_id);
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

    render() {
        return (
            <div className="container">
                { this.breadcrumb() }
                <div className="row">
                    <div className="col-md-12">
                        <div className="post mt-4 mb-4 pt-4 pb-4">
                            <h3 className="">User</h3>
                            <div className="masthead border text-center pt-4 pb-4">
                                <div className="container d-flex align-items-center flex-column">
                                    <img className="masthead-avatar mb-5" src="/static/images/avataaars.svg" alt="" />
                                    <h1 className="masthead-heading mb-0">{ this.props.user.name }</h1>
                                    <p className="masthead-subheading font-weight-light mb-0">
                                        { this.props.user.phone } - { this.props.user.email } - { this.props.user.website }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="albums mt-4 mb-4 pt-4 pb-4">
                            <div className="row">
                                <div className="col-md-6"><h3 className="">Post</h3></div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-sm text-white bg-kumparan float-right" onClick={(e) => { this.handleShowPostForm(true, e)}}>Add</button>
                                </div>
                            </div>
                            
                            <NotificationComponent />
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