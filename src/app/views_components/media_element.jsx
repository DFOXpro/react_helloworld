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
	`)
}

export {MediaEl}
