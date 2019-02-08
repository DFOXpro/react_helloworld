import PropTypes from 'prop-types';

import DEFAULT_MEDIA_IMG from '../../assets/images/no_cover.jpg'

export class Album {
	static ATTRIBUTE_LIST = ['title', 'description', 'cover', 'year', 'tracks']
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
	};
}
