import React from 'react';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import renderer from 'react-test-renderer';
import ProgressBarComponent from './ProgressBarComponent';
import configureStore from 'redux-mock-store';

import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import thunk from 'redux-thunk'

configure({ adapter: new Adapter() });


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
