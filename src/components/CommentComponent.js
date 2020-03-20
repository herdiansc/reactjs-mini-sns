import React from 'react';
import { connect } from "react-redux";
import { editComment, getPostComments, createComment, deleteComment } from '../actions';

const mapStateToProps = state => {
    return { comments: state.comments, post: state.post };
};

const mapDispatchToProps = dispatch => {
    return {
        getPostComments: payload => dispatch(getPostComments(payload)),
        editComment: (payload) => dispatch(editComment(payload)),
        createComment: payload => dispatch(createComment(payload)),
        deleteComment: payload => dispatch(deleteComment(payload))
    };
}

class CommentItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFormShown: false
        };

        this.commentName = React.createRef();
        this.commentBody = React.createRef();
        this.commentEmail = React.createRef();

        this.modalCommentId = React.createRef();
        this.modalCommentName = React.createRef();
        this.modalCommentBody = React.createRef();
        this.modalCommentEmail = React.createRef();
    }

    handleShowForm(isShown) {
        this.setState({isFormShown: isShown})
    }

    handleSubmitForm() {
        this.props.createComment({
            name: this.commentName.current.value,
            body: this.commentBody.current.value,
            email: this.commentEmail.current.value,
            postId: this.props.post.id
        }).then(()=>{
            this.props.getPostComments(this.props.post.id);
        });
        this.handleShowForm(false);
    }

    handleShowModalEditComment(comment) {
        this.modalCommentId.current.value = comment.id;
        this.modalCommentName.current.value = comment.name;
        this.modalCommentBody.current.value = comment.body;
        this.modalCommentEmail.current.value = comment.email;
    }

    handleSubmitEditForm() {
        this.props.editComment({
            id: this.modalCommentId.current.value,
            data: {
                postId: this.props.post.id,
                name: this.modalCommentName.current.value,
                body: this.modalCommentBody.current.value,
                email: this.modalCommentEmail.current.value
            }
        }).then(()=>{
            this.props.getPostComments(this.props.post.id)
        })
    }

    handleDeleteComment(id) {
        this.props.deleteComment(id).then(()=>{
            this.props.getPostComments(this.props.post.id)
        });
    }

    formComment() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <form className="border mb-4 mt-4 p-4">
                        <div className="form-row mb-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Name" ref={this.commentName} />
                            </div>
                        </div>
                        <div className="form-row mb-4">
                            <div className="col">
                                <textarea className="form-control" placeholder="Body" ref={this.commentBody}></textarea>
                            </div>
                        </div>
                        <div className="form-row mb-4">
                            <div className="col">
                                <input type="text" className="form-control" placeholder="Email" ref={this.commentEmail} />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="col">
                                <div className="btn-group float-right" role="group">
                                    <button type="button" className="btn bg-default border"  onClick={() => this.handleShowForm(false)}>Cancel</button>
                                    <button type="button" className="btn text-white bg-kumparan" onClick={(e) => this.handleSubmitForm(e)}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    modalFormEditComment() {
        return (
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <form className="p-4">
                            <input type="hidden" ref={this.modalCommentPostId} />
                            <input type="hidden" ref={this.modalCommentId} />
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Name" ref={this.modalCommentName} />
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <textarea className="form-control" placeholder="Body" ref={this.modalCommentBody}></textarea>
                                </div>
                            </div>
                            <div className="form-row mb-4">
                                <div className="col">
                                    <input type="text" className="form-control" placeholder="Email" ref={this.modalCommentEmail} />
                                </div>
                            </div>
                        </form>
                        <div className="modal-footer">
                            <button type="button" className="btn bg-default border" data-dismiss="modal">Cancel</button>
                            <button type="button" className="btn text-white bg-kumparan" data-dismiss="modal" onClick={(e) => this.handleSubmitEditForm(e)}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
    render() {
        let createForm = this.state.isFormShown ? this.formComment() : '';
    	return (
            <div className="albums mt-4 mb-4 pt-4 pb-4">
                <div className="row">
                    <div className="col-md-6"><h3 className="">Comments</h3></div>
                    <div className="col-md-6">
                        <button type="button" className="btn btn-sm text-white bg-kumparan float-right" onClick={() => { this.handleShowForm(true)}}>Add</button>
                    </div>
                </div>

                { createForm }

                <div className="row">
                    <div className="col-md-12">
                        <div className="list-group">
                            {this.props.comments.map((comment, i) => {
                                return (
                                    <div key={i} className="list-group-item list-group-item-action">
                                        <div className="d-flex w-100 justify-content-between">
                                            <h5 className="mb-1"><span className="comment-name">{ comment.name }</span></h5>
                                            <small>{ comment.email.toLowerCase() }</small>
                                        </div>
                                        <p className="mb-1">{ comment.body }</p>
                                        <div className="btn-group" role="group">
                                            <button type="button" className="btn btn-sm text-white bg-kumparan" data-toggle="modal" data-target="#exampleModal" onClick={() => this.handleShowModalEditComment(comment)}>Edit</button>
                                            <button type="button" className="btn btn-sm btn-danger"  onClick={() => this.handleDeleteComment(comment.id)}>Delete</button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {this.modalFormEditComment()}

            </div>
    	)
    }
}

const CommentItemComponent = connect(mapStateToProps, mapDispatchToProps)(CommentItem);
export default CommentItemComponent;