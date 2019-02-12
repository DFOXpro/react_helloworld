import React from "react";

import '../style/player_widget.styl';

const PlayerWidgetEl = props => {
	// console.log('PlayerWidgetEl', props);
	return pug`
		._player_widget(
			data-status= props.status.description
		)
			h3._player_widget_title
				| now playing
				= props.currentSongTittle

			button(
				onClick= props.$_handleOpenClick
			) Open
			button(
				onClick= props.$_handleMinimizeClick
			) Minimize
			button(
				onClick= props.$_handleCloseClick
			) Close
			= props.children
	`
}

export {PlayerWidgetEl}
