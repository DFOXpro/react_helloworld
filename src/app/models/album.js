import PropTypes from 'prop-types'
import {ZU_constructorHelper} from '../utils.js'
import {_InterfacePlayable} from './_interface_playable.js'

import DEFAULT_MEDIA_IMG from '../../assets/images/no_cover.jpg'

export class Album {
	static ATTRIBUTE_LIST = ['title', 'description', 'cover', 'year', 'tracks', 'parent_playlist']
	static SEARCHABLE_ATTRIBUTE_LIST = ['title', 'description', 'year']
	static DEFAULT_TITLE = 'Album sin título'
	static DEFAULT_DESCRIPTION = 'Sin descripción :('
	static DEFAULT_COVER = DEFAULT_MEDIA_IMG
	// static DEFAULT_YEAR = 00 // ??
	static DEFAULT_TRACKS = [] // Media array

	static PROPTYPES = { // https://www.npmjs.com/package/prop-types#usage
		title: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.number,
		]),
		description: PropTypes.string,
		cover: PropTypes.string, //.isRequired, useless with default states
		year: PropTypes.number.isRequired,
		tracks: PropTypes.array,
		parent_playlist: PropTypes.object.isRequired
	}

		constructor (arg, tracks, playlist) {
			this.__type = Album.name
			ZU_constructorHelper(
				this,
				arg,
				Album.ATTRIBUTE_LIST
			);
			if(playlist) this.parent_playlist = playlist
			if(tracks) this.tracks = tracks
		}

		play = () => {
			console.log('play', this);
			_InterfacePlayable.play(this.tracks)
		}
}
