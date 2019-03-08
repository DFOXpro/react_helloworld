import React, {PureComponent} from 'react'

import {PlayButtonEl} from '../atoms/play_button.jsx'
import '../../style/media.styl'

const MediaEl = props => {
	return (pug`
		._media
			p._media_title
				if props.src && props.type
					PlayButtonEl($_handlePlayClick= props.$_handlePlayClick)
				if props.track_number
					span
						= props.track_number
						|  -
				b= props.title
				span
					|  (
					= props.author
					| )
	`)
}

export {MediaEl}
