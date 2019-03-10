import React from "react"

import MAIN_LOGO_SVG from '../../../assets/images/main_logo.svg'
import {HeaderEl} from '../organisms/header.jsx'
import '../../style/index_layer.styl'

const IndexLy = props => {
	// console.log('IndexLy', props)
	return pug`
		.side_menu
			img.main_logo(
				src= MAIN_LOGO_SVG
			)
			p Une preuve de concept avec react et parceljs
			= props.children[0]
			button.side_menu_show_player(onClick= props.$_handlePlayerShowClick) Show player
		.main_content
			= props.children[1]
		footer
	`
}

export {IndexLy}
