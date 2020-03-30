import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import HomeComponent from './HomeComponent';

const mockStore = configureStore([]);

describe('HomeComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<HomeComponent />
				</Router>
			</Provider>
        );
	});

    it('should have 1 h1', ()=> {
        expect(wrapper.find('h1').length).toBe(1);
    });

    it('should have 1 h1 with specified text', ()=> {
        expect(wrapper.find('h1').text()).toBe('React Mini SNS');
    });

    it('should have 1 link', ()=> {
        expect(wrapper.find('a').length).toBe(1);
    });

    it('should have 1 link with specified text', ()=> {
        expect(wrapper.find('a').text()).toBe('Explore');
    });
});
