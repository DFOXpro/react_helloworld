/**
 * The ZMSE memory
 * @memberOf ZM_SearchEngine
 * @singleton
 * @static
 * @private
 */
let __singleton_search_dictionary = null

/**
 * @classdesc ZorroMusique search engine (ZMSE): A singleton search engine.
 * @class ZM_SearchEngine
 * @hideconstructor
 */
export class ZM_SearchEngine {

	/**
	 * Clear the ZMSE memory
	 */
	static resetSearchData = () => __singleton_search_dictionary = {
		total_items: 0,
		flatArray: [],
		pointers: {}
	}

	/**
	 * Populate the ZMSE memory
	 * @static
	 * @param {array<object>} searchableList - a list of object to be digested by the ZMSE
	 * @param {array<objectKey|string>} attribute_list - a whitelist of object keys  for the ZMSE
	 */
	static addSearchData = (searchableList, attribute_list=[]) =>{
		// console.log('addSearchData', searchableList, attribute_list)
		searchableList.forEach((entity, entity_index) => {
			// console.log(entity)
			attribute_list.forEach(
				attribute => {
					let newKey = ("" + entity[attribute]).toLowerCase()
					// console.log(attribute, newKey)
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

	/**
	 * Search any related object
	 * @static
	 * @param {string} searchValue - a value to be compared via includes in all
	 * whitelisted attributes of the objects in SE memory
	 * @return {array<object>} found objects related to searchValue
	 */
	static find = (searchValue) => {
		searchValue = searchValue.toLowerCase()
		let founds = []
		let _foundsIds = []
		__singleton_search_dictionary.flatArray.forEach(key => {
			if(key.includes(searchValue)){
				__singleton_search_dictionary.pointers[key].forEach(entity => {
					if(!_foundsIds.includes(entity.__ZM_searchId)){
						founds.push(entity)
						_foundsIds.push(entity.__ZM_searchId)
					}
				})
				// founds = [...founds, ...__singleton_search_dictionary.pointers[key]]
			}
		})
		return founds
	}
}
