import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getPostDetail, getPostComments } from '../actions';

const mapStateToProps = state => {
    return { post: state.post, comments: state.comments, user: state.user };
};

const mapDispatchToProps = dispatch => {
    return {
        getPostDetail: payload => dispatch(getPostDetail(payload)),
        getPostComments: payload => dispatch(getPostComments(payload))
    };
}

class PostDetail extends React.Component {
    componentDidMount() {
        let { match: { params } } = this.props;
        this.props.getPostDetail(params.post_id);
        this.props.getPostComments(params.post_id);
    }

    breadcrumb() {
        let name = this.props.user.name || 'User Detail';
        return (
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/user`}>Users</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/detail/${ this.props.post.userId }`}>{ name }</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Post</li>
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
                            <h3 className="">Post</h3>
                            <div className="masthead border pt-4 pb-4">                            
                                <div className="container d-flex flex-column">
                                    <h1 className="mb-0">{ this.props.post.title }</h1>
                                    <div className="divider-custom divider-light">
                                        <div className="divider-custom-line"></div>
                                    </div>
                                    <p className="masthead-subheading font-weight-light mb-0">
                                        { this.props.post.body }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="albums mt-4 mb-4 pt-4 pb-4">
                            <h3 className="">Comment</h3>
                  
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="list-group">
                                        {this.props.comments.map((comment, i) => {
                                            return (
                                                <div key={i} className="list-group-item list-group-item-action">
                                                    <div className="d-flex w-100 justify-content-between">
                                                        <h5 className="mb-1">{ comment.name }</h5>
                                                        <small>@{ comment.email }</small>
                                                    </div>
                                                    <p className="mb-1">{ comment.body }</p>
                                                </div>
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

const PostDetailComponent = connect(mapStateToProps, mapDispatchToProps)(PostDetail);
export default PostDetailComponent;