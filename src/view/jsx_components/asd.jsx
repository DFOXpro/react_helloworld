import React from 'react';

export default class Asd extends React.Component {
	render() {
		return (pug`
#asd.wrapper
	//- if props.shouldShowGreeting
	p.greeting Hello World!

	button(onClick='asd') Click Me
`)
	}
}
