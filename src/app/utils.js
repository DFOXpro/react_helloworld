// Z_Utils = Zorro_utils
function ZU_constructorHelper (dest, origin, attributes){
	// console.log('ZU_constructorHelper', dest, origin, attributes);
	if(origin) {
		attributes.forEach((attribute) => {
			dest[attribute] = origin[attribute] || dest[attribute]
		})
	}
};

export {ZU_constructorHelper};
