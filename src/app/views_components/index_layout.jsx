import React from "react"

import MAIN_LOGO_SVG from '../../assets/images/main_logo.svg'
import '../style/layer.styl'

const IndexLy = props => (
	pug`
		header
		.side_menu
			img.main_logo(
				src= MAIN_LOGO_SVG
			)
			p A React helloworld
		section.main_content
			= props.children
		footer
	`
)

export {IndexLy}
