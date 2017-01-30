export default () => {
	const res = Math.round(Math.random() * 0xFFFFFF) + 1
	const resAsHex = "000000" + res.toString(16)
	const hex = resAsHex.substring(resAsHex.length - 6, resAsHex.length)
	return `#${hex}`
}
