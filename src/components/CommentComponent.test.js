import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import CommentComponent from './CommentComponent';

const mockStore = configureStore([]);

describe('CommentComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			comments: [
				{
					"postId": 2,
					"name": "title comment",
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
			post: {"id": 1}
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<CommentComponent />
				</Router>
			</Provider>
        );
	});

    it('should have 2 comments', ()=> {
        expect(wrapper.find('div.list-group-item.list-group-item-action').length).toEqual(2);
    });
});
