import React from "react"

import {PlayButtonEl} from '../atoms/play_button.jsx'
import {SearchResultsEl} from '../atoms/search_result.jsx'
// import '../style/searcher_widget.styl'
// import loading_img from '../../../assets/images/loading.png'


/**
 * React component(view) of SearcherWidget
 */
const SearcherWidgetEl = props => {
	// console.log('PlayerWidgetEl', props)
	return pug`
		._searcher_widget
			input._side_menu_search(
				ref=props.$_searchInputRef
				onChange= props.$_handleSearchInputChange
				placeholder= props.$_searchInputPlaceholder
			)
			if props.$_searchInputValue
				._side_menu_search_results
					h3._side_menu_search_results_title
						| Résultats pour&#32
						span= props.$_searchInputValue
						| :
					._side_menu_search_results_list
						if props.searchResults
							ul
								each result, result_index in props.searchResults
									SearchResultsEl(
										...result
										play = result.play
										key= result_index
									)
						else
							b Aucun résultat
	`
}

export {SearcherWidgetEl}
