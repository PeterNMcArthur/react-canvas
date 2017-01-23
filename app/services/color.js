
// intToHex :: Number -> String
export const intToHex = int => {
	const hexVal = int.toString(16).toUpperCase()
	return (hexVal.length !== 6) ? ("000000" + hexVal).substr(-6) : hexVal
}