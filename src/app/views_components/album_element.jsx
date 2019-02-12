import React from "react";

import {PlayButtonEl} from './play_button_element.jsx';
import '../style/album.styl';

const AlbumEl = props => {
	// console.log('AlbumEl', props);
	return pug`
		._album(
			data-status= props.status
		)
			PlayButtonEl._album_play($_handlePlayClick= props.$_handlePlayClick)
			._album_resume(onClick= props.$_handleOpenClick)
				img(
					src= props.cover
				)
				h3._album_title= props.title
			._album_content
				button._album_minimize(onClick= props.$_handleMinimizeClick) ×
				p
					b Year:
					span=props.year
					br
					span= props.description
				= props.children
	`
}

export {AlbumEl}
