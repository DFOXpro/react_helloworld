import React, {PureComponent} from 'react';
import {ZU_constructorHelper} from '../utils.js'

import {PlayerWidgetController} from './player_widget_controller.jsx'
import {Media} from '../models/media.js';
import {MediaEl} from '../views_components/media_element.jsx';

export class MediaController extends PureComponent {
	parent_album = {}
	static propTypes = Media.PROPTYPES
	constructor (props) {
		super(props);
		ZU_constructorHelper(
			this.state,
			props,
			Media.ATTRIBUTE_LIST
		);
		this.parent_album = props.album
	}

	$_handlePlayClick = (event) => {
		// console.log('$_handlePlayClick');
		PlayerWidgetController.playTracks({
			tracks: [this.state],
			album: this.parent_album
		})
	}

	state = {
		title: Media.DEFAULT_TITLE,
		author: Media.DEFAULT_AUTHOR,
		type: Media.DEFAULT_TYPE,
		src: Media.DEFAULT_SRC,
		// track_number: Media.track_number
	}

	render() {
		// console.log('MediaController.render', this.state);
		return (pug`
			MediaEl(
				...this.state
				$_handlePlayClick= this.$_handlePlayClick
			)`)
	}
}
