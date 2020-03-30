import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import AppComponent from './AppComponent';

const mockStore = configureStore([]);

describe('AppComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<AppComponent />
				</Router>
			</Provider>
        );
	});

    it('should have 1 div children', ()=> {
        expect(wrapper.find(AppComponent).length).toEqual(1);
    });
});
