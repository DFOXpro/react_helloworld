import React from "react"

import MAIN_LOGO_SVG from '../../../assets/images/main_logo.svg'
import '../../style/layer.styl'

const IndexLy = props => {
	// console.log('IndexLy', props)
	return pug`
		//- header
		._side_menu
			img.main_logo(
				src= MAIN_LOGO_SVG
			)
			p Une preuve de concept avec react et parceljs
			= props.children[0]
			button._side_menu_show_player(onClick= props.$_handlePlayerShowClick) Show player
		section.main_content
			= props.children[1]
		footer
	`
}

export {IndexLy}
