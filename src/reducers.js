import {
    SET_USERS, SET_USER_DETAIL, SET_ALBUMS, SET_PHOTOS, START_FETCHING, SET_POSTS, SET_POST, SET_COMMENTS
} from './constants';

const initialState = {
  users: [],
  user:{},
  albums:[],
  photos:[],
  posts: [],
  post: {},
  comments: [],
  isLoading: false
};
function rootReducer(state = initialState, action) {
  if (action.type === SET_USERS) {
  	return {
  		...state,
  		users: action.payload,
  		isLoading: false
  	};
  }

  if (action.type === SET_USER_DETAIL) {
  	return {
  		...state,
  		user: action.payload, 
  		isLoading: false
  	};
  }

  if (action.type === SET_ALBUMS) {
  	return {
  		...state,
  		albums: action.payload,
  		isLoading: false
  	};
  }

  if (action.type === SET_PHOTOS) {
  	return {
  		...state,
  		photos: action.payload,
  		isLoading: false
  	};
  }

  if (action.type === SET_POSTS) {
	return {
		...state,
		posts: action.payload,
		isLoading: false
	};
}

if (action.type === SET_POST) {
	return {
		...state,
		post: action.payload,
		isLoading: false
	};
}

if (action.type === SET_COMMENTS) {
	return {
		...state,
		comments: action.payload,
		isLoading: false
	};
}

  if (action.type === START_FETCHING) {
  	return {
  		...state,
  		isLoading: true
  	};
  }

//   if (action.type === SET_PAGE) {
//   	return {
//   		...state,
//   		page: action.payload
//   	};
//   }

  return state;
}
export default rootReducer;