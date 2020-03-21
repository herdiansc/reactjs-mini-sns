import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import UsersComponent from './UsersComponent';
import configureStore from 'redux-mock-store';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import thunk from 'redux-thunk'

configure({ adapter: new Adapter() });


const mockStore = configureStore([thunk]);

describe('UsersComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			users: [
				{
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
				}
			]
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<UsersComponent />
				</Router>
			</Provider>
        );
	});

    it('should have 1 user', ()=> {
        expect(wrapper.find('h5.mb-1').length).toEqual(1);
    });
});
