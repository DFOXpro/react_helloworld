import React from "react"

import MAIN_LOGO_SVG from '../../../assets/images/main_logo.svg'
import {SearchResultsEl} from '../atoms/search_result.jsx'
import '../../style/layer.styl'

const IndexLy = props => {
	// console.log('IndexLy', props)
	return pug`
		header
		._side_menu
			img.main_logo(
				src= MAIN_LOGO_SVG
			)
			p Une preuve de concept avec react et parceljs
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
			//- else
			//- 	p
			//- 		| asd
			//- 		= props.$_searchInputValue
			button._side_menu_show_player(onClick= props.$_handlePlayerShowClick) Show player
		section.main_content
			= props.children
		footer
	`
}

export {IndexLy}
