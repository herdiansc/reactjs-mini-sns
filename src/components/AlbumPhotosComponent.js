import React from 'react';
import { connect } from "react-redux";
import { getAlbumPhotos } from '../actions';

const mapStateToProps = state => {
    return { photos: state.photos };
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
        this.setState({photo: photo});
    }

    render() {
        return (
            <div className="container">
                <div className="text-center py-5 mb-4">
                    <div className="container">
                        <h1 className="font-weight-light">Photos</h1>
                    </div>
                </div>

                <div className="container">
                    <div className="row">
                        {this.props.photos.map((photo, i) => {
                            return (
                                <div key={i} className="col-xl-3 col-md-6 mb-4">
                                    <div className="card border-0 shadow">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onClick={(e) => this.handleShowModal(photo, e)}>
                                            <input className="photo-url" value={photo.url} type="hidden" /> 
                                            <img src={ photo.thumbnailUrl } className="card-img-top" alt="..." />
                                        </button>
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