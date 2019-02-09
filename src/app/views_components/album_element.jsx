import React from "react";

import '../style/album.styl';

const AlbumEl = props => (
	pug`
		details._album
			summary
				._album_resume
					img(
						src= props.cover
					)
					h3._album_title= props.title
				._album_content
					p
						b Year:
						span=props.year
						br
						span= props.description
					= props.children
	`
)

export {AlbumEl}
