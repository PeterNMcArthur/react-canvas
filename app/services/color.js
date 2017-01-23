// intToHex :: Number -> String
export const intToHex = int => {
	const hexVal = int.toString(16).toUpperCase()
	return (hexVal.length !== 6) ? ("000000" + hexVal).substr(-6) : hexVal
}

// hexToRGBA :: String -> Number -> String
export const hexToRGBA = (hexVal, opacity) => {
	const [r, g, b] = [0, 2, 4].map(val => parseInt(hexVal.substring(val, val + 2), 16))
	return `rgba(${ r },${ g },${ b },${ opacity })`
}

// intToRGBA :: Number -> Number -> String
export const intToRGBA = (int, opacity) => hexToRGBA(intToHex(int), opacity) 