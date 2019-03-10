/**
* Playlists Page Controller
* @module controllers/pages/playlists
*/

import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
// import {ZU_constructorHelper} from '../../utils.js'

import {PlaylistController} from '../molecules/playlist.jsx'
import {Playlist} from '../../models/playlist.js'
import {PlaylistsPageEl} from '../../views_components/pages/playlists.jsx'

/**
 * React container(controller) of playlist page
 */
export class PlaylistsPageController extends PureComponent {

	constructor (props) {
		// console.log('PlaylistsPageController init', props)
		super(props)
		this.state.playlists = props.playlists
	}

	state = {
		// playlists: []
	}

	$_DOMhandlers = {
		$_handlePlayClick: (event) => {
			// console.log('$_handlePlayClick')
			Playlist.playPlaylists(this.state.playlists)
		}
	}

	render() {
		return (pug`
			PlaylistsPageEl(
				...this.$_DOMhandlers
			)
				each playlist, playlist_index in this.state.playlists
					PlaylistController(
						...playlist
						key= playlist_index
					)
		`)
	}
}
