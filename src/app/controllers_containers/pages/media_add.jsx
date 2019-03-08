import React, {PureComponent} from 'react'
	import {ZU_constructorHelper} from '../../utils.js'

import {Media} from '../../models/media.js'
import {MediaEl} from '../../views_components/media.jsx'

export class MediaAdderController extends PureComponent {
	parent_album = {}
	static propTypes = Media.PROPTYPES
	constructor (props) {
		super(props)
		ZU_constructorHelper(
			this.state,
			props,
			Media.ATTRIBUTE_LIST
		)
	}

	$_handleAddClick = (event) => {
		event.preventDefault()
		// console.log('$_handlePlayClick')
		new Media(this.state).play()
	}

	state = {
		title: Media.DEFAULT_TITLE,
		author: Media.DEFAULT_AUTHOR,
		type: Media.DEFAULT_TYPE,
		src: Media.DEFAULT_SRC,
		// track_number: number
		// parent_album: Album
	}

	render() {
		// console.log('MediaController.render', this.state)
		return (pug`
			MediaAdderEl(
				...this.state
				$_handleAddClick= this.$_handleAddClick
			)`)
	}
}
