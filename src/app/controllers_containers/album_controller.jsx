import React, {PureComponent} from 'react';
import {ZU_constructorHelper} from '../utils.js'

import {Album} from '../models/album.js';
import {AlbumEl} from '../views_components/album_element.jsx';
import {MediaController} from './media_controller.jsx';
import {PlayerWidgetController} from './player_widget_controller.jsx'

export class AlbumController extends PureComponent {
	#STATUS_OPEN = Symbol('OPEN')
	#STATUS_MINIMIZE = Symbol('MINIMIZE')
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
		status: this.#STATUS_MINIMIZE.description
	}
	$_eventHandlers = {
		$_handleOpenClick: () => {
			// console.log('$_handleOpenClick');
			this.setState({status: this.#STATUS_OPEN.description})
		},
		$_handleMinimizeClick: () => {
			// console.log('$_handleOpenClick');
			this.setState({status: this.#STATUS_MINIMIZE.description})
		},
		$_handlePlayClick: () =>{
			// console.log('$_handlePlayClick');
			PlayerWidgetController.playTracks(this.state.tracks)
		}
	}


	// handleClick = (event) => {
	// 	console.log(event, this.state.title);
	// 	this.setState({content: 'Cambió algo'})
	// }

	render() {
		return (pug`
			AlbumEl(
				...this.state
				...this.$_eventHandlers
			)
				each media, media_index in this.state.tracks
					MediaController(
						...media
						key= media_index
					)
		`)
	}
}
