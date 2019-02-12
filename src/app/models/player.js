import {Media} from './media.js';
import PropTypes from 'prop-types';

export class PlayerWidget {
	static STATUS_OPEN = Symbol('OPEN');
	static STATUS_MINIMIZE = Symbol('MINIMIZE');
	static STATUS_CLOSE = Symbol('CLOSE');

	static ATTRIBUTE_LIST = ['status', 'media', 'playlist']
	// static DEFAULT_STATUS = Symbol('MINIMIZE')

	static PROPTYPES = { // https://www.npmjs.com/package/prop-types#usage
		media: PropTypes.object,
		playlist: PropTypes.object,
		status: PropTypes.symbol.isRequired
	};
}
