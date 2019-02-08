import React, {PureComponent} from 'react';
import {ZU_constructorHelper} from '../utils.js'

import {Album} from '../models/album.js';
import {AlbumEl} from '../views_components/album_element.jsx';
import {MediaController} from './media_controller.jsx';

export class AlbumController extends PureComponent {
	static propTypes = Album.PROPTYPES;

	constructor (props) {
		// console.log('Playlist init', props);
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			Album.ATTRIBUTE_LIST
		);
	}

	state = {
		// year: Album.DEFAULT_YEAR,
		cover: Album.DEFAULT_COVER,
		title: Album.DEFAULT_TITLE,
		tracks: Album.DEFAULT_TRACKS,
		description: Album.DEFAULT_DESCRIPTION,
	}

	// handleClick = (event) => {
	// 	console.log(event, this.state.title);
	// 	this.setState({content: 'Cambió algo'})
	// }

	render() {
		return (pug`
			AlbumEl(...this.state)
				each media, media_index in this.state.tracks
					MediaController(
						...media
						key= media_index
					)
		`)
	}
}
