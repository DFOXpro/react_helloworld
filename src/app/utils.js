/**
* ZU = Zorro_utils: A functions toolset
* @module utils
* @see module:controllers/media_controller
*/

/**
* Set as attributes of an target objet a whitelisted params
* usefull to make quick constructors
*
* @param {object} dest - The object that will get the params.
* @param {object} origin - the params to be set.
* @param {array<objectKeys>} attributes - the params whitelist.
*/
function ZU_constructorHelper (dest, origin, attributes){
	// console.log('ZU_constructorHelper', dest, origin, attributes);
	if(origin) {
		attributes.forEach((attribute) => {
			dest[attribute] = origin[attribute] || dest[attribute]
		})
	}
};

export {
	/**
	* @see ZU_constructorHelper
	*/
	ZU_constructorHelper
};
