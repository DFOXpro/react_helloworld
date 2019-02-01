import React from 'react'
import ReactDOM from 'react-dom'

import Media from '../view/jsx_components/media.jsx'
// import {B} from './render_md.js'
// console.log('hello world');
// B.zxc();
// (new B).qwe;

function reactTest() {
	function ReactTagTest() {
		return (
			<b className = "react_tag_test">
				<span>C'est un élément généré par JSX</span>
			</b>
		);
	}
	const render = (reactElement) => {
		ReactDOM.render(
			reactElement,
			document.getElementById('react_hook')
		);
	}
	// const {Media} = await import('../view/jsx_components/media.jsx');
	// console.log(Media);
	render(<ReactTagTest />);
	render(<Media/>);
};
reactTest();