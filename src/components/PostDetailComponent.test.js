import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

import PostDetailComponent from './PostDetailComponent';

const mockStore = configureStore([thunk]);

describe('PostDetailComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			post: {
				"userId": 1,
				"id": 2,
				"title": "title post",
				"body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
			},
			comments: [
				{
					"postId": 2,
					"name": "et fugit eligendi deleniti quidem qui sint nihil autem",
					"body": "doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in",
					"email": "herdian@myrl.com",
					"id": 6
				},
				{
					"postId": 2,
					"name": "repellat consequatur praesentium vel minus molestias voluptatum",
					"body": "maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor",
					"email": "herdiansc@ole.me",
					"id": 7
				},
			],
			user: {"id": 1}
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<PostDetailComponent match={{params: {post_id: 1}, isExact: true, path: "", url: ""}} />
				</Router>
			</Provider>
        );
	});

    it('should have specified post title', ()=> {
        expect(wrapper.find(PostDetailComponent).length).toEqual(1);
        expect(wrapper.find('h1.mb-0').text()).toEqual('title post');
    });
});
