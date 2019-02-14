import React, {PureComponent} from 'react';
import ReactDOM from 'react-dom'
import {ZU_constructorHelper} from '../utils.js'

// import {Index} from '../models/playlist.js';
import {PlayerWidgetController} from './player_widget_controller.jsx'
import {PlaylistController} from './playlist_controller.jsx'
import {_SearchController} from './_search_controller.js'
import {IndexLy} from '../views_components/index_layout.jsx'

let __singleton_data = null;
class IndexController extends PureComponent {
	// static propTypes = Index.PROPTYPES;
	$_SEARCH_INPUT_PLACEHOLDER = 'Rechercher une chanson'
	$_searchInputEl = null // see $_searchInputRef


	constructor (props) {
		// console.log('IndexController init', props);
		super(props);
		__singleton_data = props.data
		// ZU_constructorHelper(
		// 	this.state,
		// 	props,
		// 	Index.ATTRIBUTE_LIST
		// );
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
				each playlist, playlist_index in __singleton_data.playlists
					PlaylistController(
						...playlist
						key= playlist_index
					)
			PlayerWidgetController
		`)
	}
}

let initMVC = function (reactHockElement, data) {
	const render = (reactElement, hook_element) => {
		ReactDOM.render(
			reactElement,
			document.getElementById(reactHockElement)
		);
	}
	render(pug`
		IndexController(data= data)
	`)
}

export {initMVC, IndexController}
