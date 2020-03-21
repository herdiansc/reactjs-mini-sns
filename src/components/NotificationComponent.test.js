import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import NotificationComponent from './NotificationComponent';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('NotificationComponent test suites', ()=> {
	let store;
	let component;

	beforeEach(() => {
		store = mockStore({
			writeAccessResponseCode: 200
		});

		store.dispatch = jest.fn();

		component = renderer.create(
			<Provider store={store}>
				<NotificationComponent />
			</Provider>
		);
	});

    it('should be success notif', ()=> {
        expect(component.root.findAllByProps({className:'alert alert-success'}).length).toEqual(1);
    });
});
