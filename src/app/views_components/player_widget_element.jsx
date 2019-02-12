import React from "react";

import {PlayButtonEl} from './play_button_element.jsx';
import '../style/player_widget.styl';
import loading_img from '../../assets/images/loading.png';

const PlayerWidgetEl = props => {
	// console.log('PlayerWidgetEl', props);
	return pug`
		._player_widget(
			data-status= props.status.description
		)
			if props.currentAlbum
				img._player_widget_img(
					src= props.currentAlbum.cover
				)
			._player_widget_flex_container
				._player_widget_controls()
					if props.player_loading
						img.loading(src= loading_img)
					if props.player_play
						button.button._player_widget_pause(
							onClick= props.$_handlePauseClick
						) ||
					if props.currentSongTittle && !(props.player_loading || props.player_play)
						PlayButtonEl._player_widget_play($_handlePlayClick= props.$_handlePlayClick)
				._player_widget_info
					p._player_widget_title
						if props.currentSongTittle
							| now playing:
							b= props.currentSongTittle
						else
							| Chose a song

				._player_widget_controls
					button.button_open(
						onClick= props.$_handleOpenClick
					) ^
					button.button_minimize(
						onClick= props.$_handleMinimizeClick
					) -
					button.button_close(
						onClick= props.$_handleCloseClick
					) ×
				._player_engine
					= props.children
	`
}

export {PlayerWidgetEl}
