import React, {PureComponent} from 'react';
import '../style/media.styl';
const MediaEl = props => {
	return (pug`
		._media(
			onClick= props.$_handleClick
		)
			h4._media_title= props.title
			p
				| Author:
				= props.author
			if props.type === 'youtube'
				iframe(
					type="text/html"
					src="http://www.youtube.com/embed/"+props.src+"?enablejsapi=1&origin=http://example.com"
					frameborder="0"
				)
	`)
}

export {MediaEl}
