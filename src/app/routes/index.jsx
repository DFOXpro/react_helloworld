import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {Route, Switch} from 'react-router-dom'

import {PlaylistsPageController} from '../controllers_containers/pages/playlists.jsx'

const routes = (data)=> {
	// console.log('index routes');
	return pug`
		Switch
			Route(
				exact
				stric
				sensitive
				path= "/"
			)
				PlaylistsPageController(
					playlists= data.playlists
				)
			Route(
				exact
				stric= undefined
				sensitive= undefined
				path= "/add_media"
			)
				h1 ADD MEDIA
					| @TODO
			Route(
				exact
				stric= undefined
				sensitive= undefined
				path= "/about"
			)
				h1 ABOUT
					| @TODO
	`
}

export {routes}
