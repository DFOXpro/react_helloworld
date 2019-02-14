import React, {PureComponent} from 'react';

import {PlayButtonEl} from './play_button_element.jsx';

const SearchResultsEl = props => {
	return (pug`
		li
			= props.play
			PlayButtonEl($_handlePlayClick= props.play)
			if props.__type === "Playlist"
				span(title="Playlist") (P)
			if props.__type === "Album"
				span(title="Album") (A)
			if props.__type === "Media"
				span(title="Media") (M)
			= " - "
			= props.title
	`)
}

export {SearchResultsEl}
