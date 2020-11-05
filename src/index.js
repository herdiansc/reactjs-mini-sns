import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import store from "./store";

import AppComponent from './components/AppComponent.js';
import HomeComponent from './components/HomeComponent.js';
import UsersComponent from './components/UsersComponent.js';
import UserDetailComponent from './components/UserDetailComponent.js';
import AlbumPhotosComponent from './components/AlbumPhotosComponent.js';
import PostDetailComponent from './components/PostDetailComponent.js';

ReactDOM.render(
	<Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
        <Route component={AppComponent} />
        <Route path="/" exact component={HomeComponent}/>
        <Route path="/user" exact component={UsersComponent}/>
        <Route path="/user/detail/:user_id" component={UserDetailComponent}/>
        <Route path="/album/detail/:album_id" component={AlbumPhotosComponent}/>
        <Route path="/post/detail/:post_id" component={PostDetailComponent}/>
    </Router>
   </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();