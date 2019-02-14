import React from "react";

import {PlayButtonEl} from './play_button_element.jsx';
import '../style/playlist.styl';

const PlaylistEl = props => (
	pug`
		._playlist
			h2._playlist_title= props.title
			p._playlist_description
				PlayButtonEl($_handlePlayClick= props.$_handlePlayClick)
				= props.description
			= props.children
	`
)

export {PlaylistEl}
