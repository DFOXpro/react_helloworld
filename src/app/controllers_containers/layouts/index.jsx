/**
* Index Page Controller
* @module controllers/pages/index
*/


import React, {PureComponent, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter, HashRouter, Route, Switch} from 'react-router-dom'
import {ZU_constructorHelper} from '../../utils.js'

import {PlayerWidgetController} from '../organisms/player.jsx'
import {SearcherWidgetController} from '../organisms/searcher.jsx'
import {PlaylistsPageController} from '../pages/playlists.jsx'
import {IndexLy} from '../../views_components/layouts/index.jsx'

let __singleton_data = null

/**
 * React container(controller) of IndexLayout
 */
class IndexController extends PureComponent {
	// static propTypes = Index.PROPTYPES

	constructor (props) {
		// console.log('IndexController init', props)
		super(props)
		__singleton_data = props.data
		// ZU_constructorHelper(
		// 	this.state,
		// 	props,
		// 	Index.ATTRIBUTE_LIST
		// )
	}

	$_DOMhandlers = {
		$_handlePlayerShowClick: PlayerWidgetController.show
	}

	routes = ()=> {
		console.log('routes');
		return pug`
			Switch
				Route(
					exact
					stric
					sensitive
					path= "/"
				)
					PlaylistsPageController(
						playlists= __singleton_data.playlists
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

	render() {
		return (pug`
			//- BrowserRouter(
			//-
			//- )
			//- basename= "react_helloworld"
			HashRouter()
				IndexLy(
					...this.state
					...this.$_DOMhandlers
				)
					SearcherWidgetController
					= this.routes()

			PlayerWidgetController
		`)
	}
}

/**
 * Start the react engine
 * @param {String<DOMElementId>} reactHockElement DOM element where react will render
 * @param {object} data args to index page
 */
const initMVC = function (reactHockElement, data) {
	const render = (reactElement, hook_element) => {
		ReactDOM.render(
			reactElement,
			document.getElementById(reactHockElement)
		)
	}
	render(pug`
		IndexController(data= data)
	`)
}


export {initMVC, IndexController}
