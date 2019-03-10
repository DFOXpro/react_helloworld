import PropTypes from 'prop-types'
import {ZU_constructorHelper} from '../utils.js'
import {_InterfacePlayable} from './_interface_playable.js'

export class Playlist extends _InterfacePlayable {
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
		super()
		this.__type = Playlist.name
		ZU_constructorHelper(
			this,
			arg,
			Playlist.ATTRIBUTE_LIST
		)
		if(albums) this.albums = albums
	}

	/**
	 * @override
	 */
	play = () => {
		// console.log('play')
		_InterfacePlayable.play(this.getMediaList())
	}

	getMediaList = () => {
		let mediaList = []
		this.albums.forEach(album => mediaList = [...mediaList, ...album.tracks])
		console.log('getMediaList', mediaList)
		return mediaList
	}

	static playPlaylists = (playlists) => {
		// console.log('playPlaylists', playlists)
		let mediasToPlay = []
		playlists.forEach(playlist =>
			mediasToPlay = [...mediasToPlay, ...(new Playlist(playlist)).getMediaList()]
		)
		_InterfacePlayable.play(mediasToPlay)
	}
}
