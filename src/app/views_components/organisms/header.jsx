import React from "react"
import { Link, NavLink } from 'react-router-dom'

import '../../style/header.styl'

/**
 * React component(view) of Header
 */
const HeaderEl = props => {
	// console.log('PlayerWidgetEl', props)
	let navLinks = [
		{text: "Tout la musique", to: "/", exact: true},
		{text: "Add media", to: "/add_media", exact: true},
		{text: "About & Contact", to: "/about", exact: true}
	]

	return pug`
		header
			each navLink, navLink_index in navLinks
				HeaderNavLink(
					...navLink
					key= navLink_index
				)
	`
}

const HeaderNavLink = props => {
	return pug`
		NavLink.nav(
			exact= props.exact
			stric= undefined
			sensitive= undefined
			to= props.to
			activeClassName= "is_active"
		)=props.text
	`
}

export {HeaderEl}
