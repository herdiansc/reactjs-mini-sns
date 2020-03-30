import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';

import ProgressBarComponent from './ProgressBarComponent';

const mockStore = configureStore([thunk]);

describe('ProgressBarComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			isLoading: true
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<ProgressBarComponent />
				</Router>
			</Provider>
        );
	});

    it('should have specified dom', ()=> {
        expect(wrapper.find('div.indeterminate').length).toEqual(1);
    });
});
