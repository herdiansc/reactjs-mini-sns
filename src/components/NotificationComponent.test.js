import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';

import NotificationComponent from './NotificationComponent';

const mockStore = configureStore([]);

describe('NotificationComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			writeAccessResponseCode: 200
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<NotificationComponent />
				</Router>
			</Provider>
        );
	});

    it('should be success notif', ()=> {
        expect(wrapper.find('div.alert.alert-success').length).toEqual(1);
    });
});
