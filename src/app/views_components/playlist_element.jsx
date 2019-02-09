import React from "react";

import '../style/playlist.styl';

const PlaylistEl = props => (
	pug`
		._playlist
			h2._playlist_title= props.title
			p._playlist_description= props.description
			= props.children
	`
)

export {PlaylistEl}
