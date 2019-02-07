import React from 'react'
import ReactDOM from 'react-dom'
import {PlaylistEl} from '../view/jsx_components/playlist_element.jsx'

import 'babel-polyfill'

// import Media from '../view/jsx_components/media.jsx'
// import mediaImg from '../assets/images/cover.jpg'

async function reactTest() {
	const render = (reactElement, hook_element = 'react_hook') => {
		ReactDOM.render(
			reactElement,
			document.getElementById(hook_element)
		);
	}

	// const {Playlist} = await import('../view/jsx_components/playlist.jsx');
	const apiIndex = await import('../data_fixtures/api_index.json');
	// const mediaImg = images['cover.jpg']
	// console.log('mediaImg', mediaImg, typeof(mediaImg));
	console.log('apiIndex', apiIndex, typeof(apiIndex));

	render(pug`
		PlaylistEl(...apiIndex)
	`);
};
reactTest();
