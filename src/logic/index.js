import React from 'react'
import ReactDOM from 'react-dom'

import Media from '../view/jsx_components/media.jsx'
import Asd from '../view/jsx_components/asd.jsx'
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
	const render = (reactElement, hook_element = 'react_hook') => {
		ReactDOM.render(
			reactElement,
			document.getElementById(hook_element)
		);
	}
	// const {Media} = await import('../view/jsx_components/media.jsx');
	// console.log(Media);
	// render(<ReactTagTest />);
	render(<Asd />, 'asd');
	render(<Media/>);
};
reactTest();
