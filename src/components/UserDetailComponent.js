import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getUserDetail, getAlbums, getPosts } from '../actions';

const mapStateToProps = state => {
    return { user: state.user, albums: state.albums, posts: state.posts };
};

const mapDispatchToProps = dispatch => {
    return {
        getUserDetail: payload => dispatch(getUserDetail(payload)),
        getAlbums: payload => dispatch(getAlbums(payload)),
        getPosts: payload => dispatch(getPosts(payload))
    };
}

class UserDetail extends React.Component {
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
                    <li class="breadcrumb-item active" aria-current="page">{ this.props.user.name }</li>
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
                            <h3 className="">Post</h3>
                  
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