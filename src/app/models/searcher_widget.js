import {ZM_SearchEngine} from '../vendors/ZM_search_engine'

/**
 * Bridge for the search engine
 * @hideconstructor
 */
export class SearcherWidget {
	static find = ZM_SearchEngine.find
	static resetSearchData = ZM_SearchEngine.resetSearchData
	static addSearchData = ZM_SearchEngine.addSearchData
}
