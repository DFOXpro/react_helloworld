/**
* Index Page Controller
* @module controllers/pages/index
*/


import React, {PureComponent, Fragment} from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
// import {BrowserRouter} from 'react-router-dom'
// import {ZU_constructorHelper} from '../../utils.js'

import {PlayerWidgetController} from '../organisms/player.jsx'
import {SearcherWidgetController} from '../organisms/searcher.jsx'
import {IndexLy} from '../../views_components/layouts/index.jsx'
import {routes} from '../../routes/index.jsx'

/**
 * React container(controller) of IndexLayout
 */
class IndexController extends PureComponent {
	// static propTypes = Index.PROPTYPES

	constructor (props) {
		// console.log('IndexController init', props)
		super(props)
		this.state.data = props.data
		// ZU_constructorHelper(
		// 	this.state,
		// 	props,
		// 	Index.ATTRIBUTE_LIST
		// )
	}

	$_DOMhandlers = {
		$_handlePlayerShowClick: PlayerWidgetController.show
	}

	state = {
		// data: playlists data
	}

	render() {
		return (pug`
			//- BrowserRouter(
			//- 	basename= "react_helloworld"
			//- )
			HashRouter()
				IndexLy(
					...this.state
					...this.$_DOMhandlers
				)
					SearcherWidgetController
					= routes(this.state.data)

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
