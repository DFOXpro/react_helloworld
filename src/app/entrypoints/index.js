import React from 'react';
import ReactDOM from 'react-dom'
import {PlaylistController} from '../controllers_containers/playlist_controller.jsx'

import 'babel-polyfill' // for dynamic import

async function main() {
	const render = (reactElement, hook_element = 'react_hook') => {
		ReactDOM.render(
			reactElement,
			document.getElementById(hook_element)
		);
	}
	const apiIndex = await import('../../data_fixtures/api_index.json');
	// console.log('apiIndex', apiIndex, typeof(apiIndex));

	render(pug`PlaylistController(...apiIndex)`);
};
main();
