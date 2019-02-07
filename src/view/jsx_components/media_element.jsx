import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {ZU_constructorHelper} from '../../logic/utils.js'
import '../../style/media.styl';

export class MediaEl extends PureComponent {
	static propTypes = { // https://www.npmjs.com/package/prop-types#usage
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		author: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		type: PropTypes.oneOf([
			'youtube', 'audio', 'video', 'image', 'none'
		]),
		src: PropTypes.string, //.isRequired,
	};
	constructor (props) {
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			['title', 'author', 'type', 'src']
		);
	}

	state = {
		title: 'Album sin título',
		author: 'Autor desconocido',
		type: 'none',
		src: 'dQw4w9WgXcQ'
	}

	handleClick = (event) => {
		console.log(event, this.state.title);
		this.setState({content: 'Cambió algo'})
	}
	render() {
		console.log('Media state', this.state);
		return (pug`
			._media(
				onClick= this.handleClick
				title= this.state.imgDesc
			)
				h4._media_title= this.state.title
				if this.state.type === 'youtube'
					iframe(
						type="text/html"
						width="640" height="390"
						src="http://www.youtube.com/embed/"+this.state.src+"?enablejsapi=1&origin=http://example.com"
						frameborder="0"
					)
			`)
	}
}
