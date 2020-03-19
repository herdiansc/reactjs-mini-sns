import React from 'react';
import { Link } from 'react-router-dom'; 
import { connect } from "react-redux";
import { getAlbumPhotos } from '../actions';

const mapStateToProps = state => {
    return { photos: state.photos, user: state.user };
};

const mapDispatchToProps = dispatch => {
    return {
        getAlbumPhotos: payload => dispatch(getAlbumPhotos(payload))
    };
}

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {photo: {}};

        this.handleShowModal = this.handleShowModal.bind(this);
      }

    componentDidMount() {
        let { match: { params } } = this.props;
        this.props.getAlbumPhotos(params.album_id);
    }

    handleShowModal(photo, e) {
        e.preventDefault();
        this.setState({photo: photo});
    }

    breadcrumb() {
        let userDetail
        if (Object.keys(this.props.user).length > 0) {
            userDetail = <li className="breadcrumb-item"><Link to={`/user/detail/${ this.props.user.id }`}>{ this.props.user.name }</Link></li>
        }

        return (
            <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/user`}>Users</Link></li>
                { userDetail }
                <li class="breadcrumb-item active" aria-current="page">Photos</li>
            </ol>
        </nav>
        )
    }

    render() {
        return (
            <div className="container">
                { this.breadcrumb() }
                <div className="row">
                    <div className="col-md-12 py-5 mb-4">
                        <h3 className="">Photos</h3>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {this.props.photos.map((photo, i) => {
                            return (
                                <div key={i} className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-0 shadow">
                                        <Link to="" data-toggle="modal" data-target="#exampleModal" onClick={(e) => this.handleShowModal(photo, e)}>
                                            <input className="photo-url" value={photo.url} type="hidden" /> 
                                            <img src={ photo.thumbnailUrl } className="card-img-top" alt="..." />
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <img src={this.state.photo.url} className="card-img-top" alt="..." />
                            <div className="container">
                                <div className="row pt-4 pb-4">
                                    <div className="col-md-12">
                                        { this.state.photo.title }
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
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