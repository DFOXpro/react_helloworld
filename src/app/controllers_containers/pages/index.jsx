/**
* Index Page Controller
* @module controllers/pages/index
*/


import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {ZU_constructorHelper} from '../../utils.js'

// import {Index} from '../../models/playlist.js'
import {PlayerWidgetController} from '../organisms/player.jsx'
import {SearcherWidgetController} from '../organisms/searcher.jsx'
import {PlaylistController} from '../molecules/playlist.jsx'
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

	render() {
		return (pug`
			IndexLy(
				...this.state
				...this.$_DOMhandlers
			)
				SearcherWidgetController
				div
					each playlist, playlist_index in __singleton_data.playlists
						PlaylistController(
							...playlist
							key= playlist_index
						)
			PlayerWidgetController
		`)
	}
}

/**
 * Start the react engine
 * @param {String<DOMElementId>} reactHockElement DOM element where react will render
 * @param {object} data args to index page
 */
let initMVC = function (reactHockElement, data) {
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
