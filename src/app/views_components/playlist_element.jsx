import React from "react";

import '../style/playlist.styl';

const PlaylistEl = props => (
	pug`
		details._playlist
			summary._playlist_title
				h2= props.title
			p._playlist_description= props.description
			= props.children
	`
)

export {PlaylistEl}
