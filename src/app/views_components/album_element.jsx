import React from "react";

import '../style/album.styl';

const AlbumEl = props => (
	pug`
		details._album
			summary._album_title
				h3= props.title
			img(
				src= props.cover
			)
			p
				b Year:
				span=props.year
				br
				span= props.description
			= props.children
	`
)

export {AlbumEl}
