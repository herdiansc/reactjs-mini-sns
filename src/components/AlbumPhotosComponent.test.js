import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mount, configure } from 'enzyme';
import thunk from 'redux-thunk';

import AlbumPhotosComponent from './AlbumPhotosComponent';

const mockStore = configureStore([thunk]);

describe('AlbumPhotosComponent test suites', ()=> {
	let store;
	let wrapper;

	beforeEach(() => {
		store = mockStore({
			photos: [
				{
					"albumId": 1,
					"id": 2,
					"title": "reprehenderit est deserunt velit ipsam",
					"url": "https://via.placeholder.com/600/771796",
					"thumbnailUrl": "https://via.placeholder.com/150/771796"
				},
				{
					"albumId": 1,
					"id": 3,
					"title": "officia porro iure quia iusto qui ipsa ut modi",
					"url": "https://via.placeholder.com/600/24f355",
					"thumbnailUrl": "https://via.placeholder.com/150/24f355"
				}
			],
			user: {"id": 1}
		});

		wrapper = mount(
			<Provider store={store}>
				<Router>
					<AlbumPhotosComponent
						match={{params: {album_id: 1}, isExact: true, path: "", url: ""}}
					/>
				</Router>
			</Provider>
        );
	});

    it('should have 2 photos', ()=> {
        expect(wrapper.find('div.card.border-0.shadow').length).toEqual(2);
    });
});
