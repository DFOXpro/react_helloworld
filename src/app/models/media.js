import PropTypes from 'prop-types'
import {ZU_constructorHelper} from '../utils.js'
import {_InterfacePlayable} from './_interface_playable.js'

export class Media {
	static ATTRIBUTE_LIST = ['title', 'author', 'type', 'src', 'track_number', 'parent_album']
	static SEARCHABLE_ATTRIBUTE_LIST = ['title', 'author', 'track_number']
	static DEFAULT_TITLE = 'Album sin título'
	static DEFAULT_AUTHOR = 'Autor desconocido'
	static DEFAULT_TYPE = 'none'
	static DEFAULT_SRC = 'dQw4w9WgXcQ' // Rick roll youtube id

	static PROPTYPES = { // https://www.npmjs.com/package/prop-types#usage
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
		track_number: PropTypes.number,
		parent_album: PropTypes.object.isRequired,
	}

	constructor (arg, album) {
		this.__type = Media.name
		ZU_constructorHelper(
			this,
			arg,
			Media.ATTRIBUTE_LIST
		);
		if(album) this.parent_album = album
	}

	play = () => {
		console.log('media.play', this);
		_InterfacePlayable.play([this])
	}
}
