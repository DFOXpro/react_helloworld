import React, {PureComponent} from 'react'
import {ZU_constructorHelper} from '../../utils.js'

import {SearcherWidget} from '../../models/searcher_widget.js'
import {SearcherWidgetEl} from '../../views_components/organisms/searcher.jsx'

/**
 * React container(controller) of SearcherWidget
 */
export class SearcherWidgetController extends PureComponent {

	/**
	 * No custom params
	 */
	constructor (props) {
		super(props)
		// ZU_constructorHelper(
		// 	this.state,
		// 	props,
		// 	SearcherWidget.ATTRIBUTE_LIST
		// )
	}

	DOM_ELEMENT_CONTAINER_ID = 'searcher_widget_hook'

	/**
	 * Search input placeholder
	 * @TODO localize
	 */
	$_SEARCH_INPUT_PLACEHOLDER = 'Rechercher une chanson'

	/**
	 * DOMElement input for search
	 * @private
	 */
	$_searchInputEl = null

	/**
	 * React ref of $_searchInputEl
	 * @see $_searchInputEl
	 */
	$_searchInputRef = (element) => {
		this.$_searchInputEl = element
	}

	/**
	 * Search $_searchInputEl.value and print founds
	 * @listen $_searchInputEl.onChange
	 */
	$_handleSearchInputChange = (event) => {
		this.setState({$_searchInputValue: this.$_searchInputEl.value})
		this.setState({searchResults: SearcherWidget.find(
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
		$_handleSearchInputChange: this.$_handleSearchInputChange
	}

	render() {
		// console.log('PlayerWidgetController.render')
		return (pug`
			SearcherWidgetEl(
				...this.state
				...this.$_DOMhandlers
			)
		`)
	}
}
