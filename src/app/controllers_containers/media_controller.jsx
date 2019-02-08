import React, {PureComponent} from 'react';
import {ZU_constructorHelper} from '../utils.js'

import {Media} from '../models/media.js';
import {MediaEl} from '../views_components/media_element.jsx';

export class MediaController extends PureComponent {
	static propTypes = Media.PROPTYPES
	constructor (props) {
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			Media.ATTRIBUTE_LIST
		);
	}

	$_handleClick = (event) => {
		console.log(event, this.state.title);
		this.setState({title: 'Cambió algo'})
	}

	state = {
		title: Media.DEFAULT_TITLE,
		author: Media.DEFAULT_AUTHOR,
		type: Media.DEFAULT_TYPE,
		src: Media.DEFAULT_SRC,
	}

	render() {
		return (pug`
			MediaEl(
				...this.state
				$_handleClick= this.$_handleClick
			)`)
	}
}
