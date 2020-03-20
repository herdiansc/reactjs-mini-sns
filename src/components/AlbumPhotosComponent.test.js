import React from 'react';
// import { shallow } from 'enzyme';
import {BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import AlbumPhotosComponent from './AlbumPhotosComponent';
import configureStore from 'redux-mock-store';
const mockStore = configureStore([]);

describe('AlbumPhotosComponent test suites', ()=> {
	let store;
	let component;

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

		store.dispatch = jest.fn();

		component = renderer.create(
			<Provider store={store}>
				<Router>
					<AlbumPhotosComponent
						match={{params: {album_id: 1}, isExact: true, path: "", url: ""}}
					/>
				</Router>
			</Provider>
		);
	});

    it('Album should have 2 photos', ()=> {
        expect(component.root.findAllByProps({className:'card border-0 shadow'}).length).toEqual(2);
    });

    // it('A modal should be displayed when a photo clicked', ()=> {
    // 	renderer.act(()=>{
    //   		component.root.findAllByProps({className:'photo'})[0].props.onClick();
    // 	})
    // 	expect(1).toEqual(1);
    // });

});
