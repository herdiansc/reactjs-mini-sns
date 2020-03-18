import {
    API_SERVER_HOST,
    START_FETCHING, SET_USERS, SET_USER_DETAIL, SET_ALBUMS, SET_PHOTOS, SET_POSTS, SET_POST, SET_COMMENTS
} from './constants';

export function getUsers(payload) {
	// scroll(0,0);
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/users`)
            .then(result=>result.json())
            .then(items=> {
            	dispatch({ type: SET_USERS, payload: items });
            });
  };
};

export function getUserDetail(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/users/${ payload }`)
            .then(result=>result.json())
            .then(item=> {
            	dispatch({ type: SET_USER_DETAIL, payload: item });
            });
  };
};

export function getAlbums(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/users/${ payload }/albums`)
            .then(result=>result.json())
            .then(items=> {
            	dispatch({ type: SET_ALBUMS, payload: items });
            });
  };
};

export function getPosts(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/users/${ payload }/posts`)
            .then(result=>result.json())
            .then(items=> {
            	dispatch({ type: SET_POSTS, payload: items });
            });
  };
};

export function getPostDetail(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/posts/${ payload }`)
            .then(result=>result.json())
            .then(items=> {
            	dispatch({ type: SET_POST, payload: items });
            });
  };
};

export function getPostComments(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/posts/${ payload }/comments`)
            .then(result=>result.json())
            .then(items=> {
            	dispatch({ type: SET_COMMENTS, payload: items });
            });
  };
};

export function getAlbumPhotos(payload) {
	return dispatch => {
		dispatch({ type: START_FETCHING });
        return fetch(`${ API_SERVER_HOST }/photos?albumId=${ payload }`)
            .then(result=>result.json())
            .then(items=> {
            	dispatch({ type: SET_PHOTOS, payload: items });
            });
  };
};