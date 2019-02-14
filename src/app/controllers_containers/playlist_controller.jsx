import React, {PureComponent} from 'react';
import {ZU_constructorHelper} from '../utils.js'

import {Playlist} from '../models/playlist.js';
import {PlaylistEl} from '../views_components/playlist_element.jsx';
import {AlbumController} from './album_controller.jsx';

export class PlaylistController extends PureComponent {
	static propTypes = Playlist.PROPTYPES;

	constructor (props) {
		// console.log('Albums init', props);
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			Playlist.ATTRIBUTE_LIST
		);
	}

	state = {
		albums: Playlist.DEFAULT_ALBUMS,
		title: Playlist.DEFAULT_TITLE,
		description: Playlist.DEFAULT_DESCRIPTION
	}

	$_handlePlayClick = (event) => {
		// console.log('$_handlePlayClick');
		new Playlist(this.state).play()
	}

	render() {
		return (pug`
			PlaylistEl(
				...this.state
				$_handlePlayClick= this.$_handlePlayClick
			)
				each album, album_index in this.state.albums
					AlbumController(
						...album
						key= album_index
					)
		`)
	}
}
