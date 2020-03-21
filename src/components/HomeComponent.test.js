import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import HomeComponent from './HomeComponent';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('HomeComponent test suites', ()=> {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({});

		component = renderer.create(
			<Provider store={store}>
				<Router>
					<HomeComponent
					/>
				</Router>
			</Provider>
		);
	});

    it('should have 1 h1', ()=> {
        expect(component.root.findAllByType('h1').length).toBe(1);
    });

    it('should have 1 h1 with specified text', ()=> {
        expect(component.root.findAllByType('h1')[0].children[0]).toBe('Mini Social Media App');
    });

    it('should have 1 link', ()=> {
        expect(component.root.findAllByType('a').length).toBe(1);
    });

    it('should have 1 link with specified text', ()=> {
        expect(component.root.findAllByType('a')[0].children[0]).toBe('Explore');
    });
});
