import React, {PureComponent} from 'react';
const PlayButtonEl = props => {
	return (pug`
		button._play_button(
			onClick= props.$_handlePlayClick
			className= props.className
		) >
	`)
}

export {PlayButtonEl}
