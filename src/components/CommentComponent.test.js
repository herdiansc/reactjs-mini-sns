import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import CommentComponent from './CommentComponent';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('CommentComponent test suites', ()=> {
	let store;
	let component;

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

		store.dispatch = jest.fn();

		component = renderer.create(
			<Provider store={store}>
				<CommentComponent />
			</Provider>
		);
	});

    it('should have 2 comments', ()=> {
        expect(component.root.findAllByProps({className:'list-group-item list-group-item-action'}).length).toEqual(2);
    });

    it('should contains specified comment name/title', ()=> {
    	expect(
    		component.root.findAllByProps({className:'comment-name'})[0].children[0]
    	).toBe('title comment');
    });

    it('should contains 2 action button', ()=> {
    	expect(
    		component.root.findAllByProps({className:'btn-group'})[0].children.length
    	).toBe(2);
    });
});
