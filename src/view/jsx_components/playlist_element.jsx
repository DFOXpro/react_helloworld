import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {AlbumEl} from './album_element.jsx';
import {ZU_constructorHelper} from '../../logic/utils.js'
import '../../style/playlist.styl';

export class PlaylistEl extends PureComponent {
	static propTypes = { // https://www.npmjs.com/package/prop-types#usage
		albums: PropTypes.array,
		title: PropTypes.oneOfType([
			PropTypes.string, //.isRequired,
			PropTypes.number, //.isRequired
		]),
		description: PropTypes.string, //.isRequired,
	};

	constructor (props) {
		// console.log('Albums init', props);
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			['albums', 'title', 'description']
		);
	}

	state = {
		albums: []
	}
	//
	// handleClick = (event) => {
	// 	console.log(event, this.state.title);
	// 	this.setState({content: 'Cambió algo'})
	// }
	render() {
		console.log('Albums state', this.state);
		return (pug`
			details._playlist
				summary._playlist_title
					h2= this.state.title
				p._playlist_description= this.state.description
				each album, album_index in this.state.albums
					AlbumEl(
						...album
						key= album_index
					)
		`)
	}
}
