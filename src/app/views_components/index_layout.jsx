import React from "react"

import MAIN_LOGO_SVG from '../../assets/images/main_logo.svg'
import '../style/layer.styl'

const IndexLy = props => (
	pug`
		header
		._side_menu
			img.main_logo(
				src= MAIN_LOGO_SVG
			)
			p A React helloworld
			//- if !props.playerIsActive
			button._side_menu_show_player(onClick= props.playerShow) Show player
		section.main_content
			= props.children
		footer
	`
)

export {IndexLy}
