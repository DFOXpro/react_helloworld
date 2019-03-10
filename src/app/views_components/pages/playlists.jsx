import React from 'react'

import {PlayButtonEl} from '../atoms/play_button.jsx'
import '../../style/playlists_page.styl'

const PlaylistsPageEl = props => {
	// console.log('PlaylistsPageEl', props)
	return pug`
		section.PlaylistsPage
			p.title
				PlayButtonEl($_handlePlayClick= props.$_handlePlayClick)
				| Jouer tout
			= props.children
	`
}

export {PlaylistsPageEl}
