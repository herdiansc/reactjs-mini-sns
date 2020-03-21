import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import UserDetailComponent from './UserDetailComponent';
import configureStore from 'redux-mock-store';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import thunk from 'redux-thunk'

configure({ adapter: new Adapter() });


const mockStore = configureStore([thunk]);

describe('UserDetailComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			user: {
				"id": 1,
				"name": "Leanne Graham",
				"username": "Bret",
				"email": "Sincere@april.biz",
				"address": {
					"street": "Kulas Light",
					"suite": "Apt. 556",
					"city": "Gwenborough",
					"zipcode": "92998-3874",
					"geo": {
						"lat": "-37.3159",
						"lng": "81.1496"
					}
				},
				"phone": "1-770-736-8031 x56442",
				"website": "hildegard.org",
				"company": {
					"name": "Romaguera-Crona",
					"catchPhrase": "Multi-layered client-server neural-net",
					"bs": "harness real-time e-markets"
				}
			},
			albums: [
				{
					"userId": 1,
					"id": 1,
					"title": "quidem molestiae enim"
				},
				{
					"userId": 1,
					"id": 2,
					"title": "sunt qui excepturi placeat culpa"
				},
			],
			posts: [
				{
					"userId": 1,
					"id": 2,
					"title": "qui est esse",
					"body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
				},
				{
					"userId": 1,
					"id": 3,
					"title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
					"body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
				},
			]
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<UserDetailComponent match={{params: {user_id: 1}, isExact: true, path: "", url: ""}} />
				</Router>
			</Provider>
        );
	});

    it('should have user with specified name', ()=> {
        expect(wrapper.find('h1.masthead-heading').text()).toEqual('Leanne Graham');
    });
});
