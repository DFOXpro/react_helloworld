/**
* Index Page Controller
* @module controllers/pages/index
*/


import React, {PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {ZU_constructorHelper} from '../../utils.js'

// import {Index} from '../../models/playlist.js'
import {PlayerWidgetController} from '../organisms/player.jsx'
// import {PlayerWidgetController} from '../organisms/searcher.jsx'
import {PlaylistController} from '../molecules/playlist.jsx'
import {_SearchController} from '../_search_controller.js'
import {IndexLy} from '../../views_components/layouts/index.jsx'

let __singleton_data = null

/**
 * React component of Index
 */
class IndexController extends PureComponent {
	// static propTypes = Index.PROPTYPES
	$_SEARCH_INPUT_PLACEHOLDER = 'Rechercher une chanson'
	$_searchInputEl = null // see $_searchInputRef


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

	$_searchInputRef = (element) => {
		this.$_searchInputEl = element
	}

	$_handleSearchInputChange = (event) => {
		this.setState({$_searchInputValue: this.$_searchInputEl.value})
		this.setState({searchResults: _SearchController.find(
			this.$_searchInputEl.value
		)})
		// console.log(
		// 	'$_handleSearchInputChange',
		// 	// event,
		// 	this.state.$_searchInputValue
		// )
	}

	state = {
		$_searchInputValue: '',
		searchResults: []
	}
	$_DOMhandlers = {
		$_searchInputRef: this.$_searchInputRef,
		$_searchInputPlaceholder: this.$_SEARCH_INPUT_PLACEHOLDER,
		$_handleSearchInputChange: this.$_handleSearchInputChange,
		$_handlePlayerShowClick: PlayerWidgetController.show
	}

	render() {
		return (pug`
			IndexLy(
				...this.state
				...this.$_DOMhandlers
			)
				//- MediaAdderController()
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
