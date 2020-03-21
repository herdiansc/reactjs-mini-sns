import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AppComponent from './AppComponent';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('AppComponent test suites', ()=> {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({});

		component = renderer.create(
			<Provider store={store}>
				<Router>
					<AppComponent
					/>
				</Router>
			</Provider>
		);
	});

    it('should have 1 div children', ()=> {
        expect(component.root.children.length).toBe(1);
    });
});
