import PropTypes from 'prop-types'
import {ZU_constructorHelper} from '../utils.js'
import {_InterfacePlayable} from './_interface_playable.js'

export class Playlist {
	static ATTRIBUTE_LIST = ['albums', 'title', 'description']
	static SEARCHABLE_ATTRIBUTE_LIST = ['title', 'description']
	static DEFAULT_ALBUMS = []
	static DEFAULT_TITLE = 'Lista de reproducción sin título'
	static DEFAULT_DESCRIPTION = 'Sin descripción :('

	static PROPTYPES = { // https://www.npmjs.com/package/prop-types#usage
		albums: PropTypes.array, // Album array
		title: PropTypes.oneOfType([
			PropTypes.string, //.isRequired,
			PropTypes.number, //.isRequired
		]),
		description: PropTypes.string, //.isRequired,
		
	}

	constructor (arg, albums) {
		this.__type = Playlist.name
		ZU_constructorHelper(
			this,
			arg,
			Playlist.ATTRIBUTE_LIST
		)
		if(albums) this.albums = albums
	}

	play = () => {
		let mediaList = []
		this.albums.forEach(album => mediaList = [...mediaList, ...album.tracks])
		console.log('play', mediaList);
		_InterfacePlayable.play(mediaList)
	}
}
