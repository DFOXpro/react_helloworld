let __singleton_search_dictionary = null;
let __private_static_setSearchDictionary = () => __singleton_search_dictionary = {
	total_items: 0,
	flatArray: [],
	pointers: {}
}

class ZM_SearchEngine {

	static resetSearchData = () => __private_static_setSearchDictionary()

	static addSearchData = (serchableList, attribute_list=[]) =>{
		// console.log('addSearchData', serchableList, attribute_list);
		serchableList.forEach((entity, entity_index) => {
			// console.log(entity);
			attribute_list.forEach(
				attribute => {
					let newKey = ("" + entity[attribute]).toLowerCase()
					// console.log(attribute, newKey);
					if(!__singleton_search_dictionary.flatArray.includes(newKey)) {
						// console.log('add key for', newKey)
						__singleton_search_dictionary.pointers[newKey] = []
						__singleton_search_dictionary.flatArray.push(newKey)
					}
					__singleton_search_dictionary.pointers[newKey].push(entity)
					__singleton_search_dictionary.pointers[newKey][
						__singleton_search_dictionary.pointers[newKey].length-1
					].__ZM_searchId = __singleton_search_dictionary.total_items++
				}
			)
		})
	}

	static find = (searchValue) => {
		searchValue = searchValue.toLowerCase()
		let founds = []
		let foundsIds = []
		__singleton_search_dictionary.flatArray.forEach(key => {
			if(key.includes(searchValue)){
				__singleton_search_dictionary.pointers[key].forEach(entity => {
					if(!foundsIds.includes(entity.__ZM_searchId)){
						founds.push(entity)
						foundsIds.push(entity.__ZM_searchId)
					}
				})
				// founds = [...founds, ...__singleton_search_dictionary.pointers[key]]
				
			}
		})
		return founds
	}
}

console.info(
	'disable info for production',
	window._debug_ZM_SearchEngine__singleton_search_dictionary = () => __singleton_search_dictionary
)

export {ZM_SearchEngine}
