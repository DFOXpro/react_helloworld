import PropTypes from 'prop-types';

export class Playlist {
	static ATTRIBUTE_LIST = ['albums', 'title', 'description']
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
	};
}
