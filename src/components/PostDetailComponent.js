import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { getPostDetail, getPostComments, editPost, deletePost } from '../actions';
import NotificationComponent from './NotificationComponent.js'
import CommentComponent from './CommentComponent.js'

const mapStateToProps = state => {
    return { post: state.post, comments: state.comments, user: state.user };
};

const mapDispatchToProps = dispatch => {
    return {
        getPostDetail: payload => dispatch(getPostDetail(payload)),
        editPost: payload => dispatch(editPost(payload)),
        deletePost: payload => dispatch(deletePost(payload)),
        getPostComments: payload => dispatch(getPostComments(payload))
    };
}

class PostDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditFormShown: false,
            isCommentFormShown: false
        };

        this.postBody = React.createRef();
        this.postTitle = React.createRef();
    }

    componentDidMount() {
        let { match: { params } } = this.props;
        this.loadPost(params.post_id);
        this.props.getPostComments(params.post_id);
    }

    loadPost(id) {
        this.props.getPostDetail(id).then(()=>{
            this.postBody.current.value = this.props.post.body;
            this.postTitle.current.value = this.props.post.title;
        });
    }

    breadcrumb() {
        let name = this.props.user.name || 'User Detail';
        return (
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/user`}>Users</Link></li>
                <li className="breadcrumb-item"><Link to={`/user/detail/${ this.props.post.userId }`}>{ name }</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Post</li>
            </ol>
        </nav>
        )
    }

    handleSubmitEditPostForm(e) {
        this.props.editPost({
            postId: this.props.post.id, 
            data: {
                body: this.postBody.current.value,
                title: this.postTitle.current.value,
                userId: this.props.post.userId
            }
        }).then(()=>{
            this.loadPost(this.props.post.id);
        });
        this.handleShowEditForm(false);
    }

    showEditPostForm() {
        let displayStyle = this.state.isEditFormShown ? {} : {display:'none'};
        return (
            <div className="row" style={displayStyle}>
                <div className="col-md-12">
                    <form className="border mb-4 mt-4 p-4">
                        <div className="form-row mb-4">
                            <div className="col">
                                <textarea className="form-control" placeholder="Body" ref={this.postBody}></textarea>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col-sm-8 mb-4">
                                <input type="text" className="form-control" placeholder="Title" ref={this.postTitle} />
                            </div>
                            <div className="col-sm-4 mb-4">
                                <div className="btn-group float-right" role="group">
                                    <button type="button" className="btn bg-default border"  onClick={() => this.handleShowEditForm(false)}>Cancel</button>
                                    <button type="button" className="btn text-white bg-kumparan" onClick={(e) => this.handleSubmitEditPostForm(e)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    showPostText() {
        let displayStyle = !this.state.isEditFormShown ? {} : {display:'none'};
        return (
            <div className="masthead border pt-4 pb-4" style={displayStyle}>                            
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
        )
    }

    handleShowEditForm(isShown) {
        this.setState({isEditFormShown: isShown})
    }

    handleDeletPost() {
        this.props.deletePost(this.props.post.id)
        .then(()=>{
            this.props.history.push("/user/detail/"+this.props.post.userId);
        });
    }

    render() {
        return (
            <div className="container">
                { this.breadcrumb() }
                <div className="row">
                    <div className="col-md-12">
                        <div className="post mt-4 mb-4 pt-4 pb-4">
                            <div className="row">
                                <div className="col"><h3 className="">Post</h3></div>
                                <div className="col">
                                    <div className="btn-group float-right" role="group">
                                        <button type="button" className="btn btn-sm text-white bg-kumparan" onClick={() => this.handleShowEditForm(true)}>Edit</button>
                                        <button type="button" className="btn btn-sm btn-danger"  onClick={() => this.handleDeletPost()}>Delete</button>
                                    </div>
                                </div>
                            </div>
                            <NotificationComponent />
                            { this.showEditPostForm() }
                            { this.showPostText() }
                        </div>

                        <CommentComponent />

                    </div>
                </div>
            </div>
        );
    }
}

const PostDetailComponent = connect(mapStateToProps, mapDispatchToProps)(PostDetail);
export default PostDetailComponent;