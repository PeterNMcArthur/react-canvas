const lastItem = arr => arr[arr.length - 1]

export const findPositions = (data, indexMap = []) => {
	return data.map((child, index) => {
		const newIndexMap = [...indexMap, index]
		child.position = newIndexMap
		if (child.children) findPositions(child.children, newIndexMap)
			return child
	})
}

export const flatten = (data, flatArr = []) => {
	data.forEach(child => {
		const keys = Object.keys(child)
		const obj = keys.reduce((arr, key) => {
			if (key !== "children") arr[key] = child[key]
				return arr
		}, {})
		flatArr.push(obj)
		if (child.children) flatten(child.children, flatArr)
	})
	return flatArr
}

const colorsMap = {
	0: 0x363537,
	1: 0xCCE6B, 
	2: 0xCED31, 
	3: 0xF2D56, 
	4: 0xD7D3A
}

export const position = ({ data, position }) => {

	const padding = 5
	const width = 100
	const height = 50	
	return data.map((item, index) => {
		return [
		{
			shapes: "Rect",
			width,
			height,
			fill: 0x0023F3
		},
		{
			transforms: [
			{
				transforms: "Translate",
				x: (width + padding) * 1, 
				y: (height + padding) * 1
			}
			]
		}
		]
	})
}

const loop = (arr, result = [], depth = 1) => {
	const padding = 10
	arr.forEach((item, index) => {
		result.push([
		{
			shapes: "Rect",
			width: 100,
			height: 100,
			fill: 0xFF7F3F
		},
		{
			transforms: [
			{
				transforms: "Translate",
				x: (100 + padding) * (index + 1),
				y: (100 + padding) * depth
			}
			]
		}
		])
		if(item.children) loop(item.children, result, depth + 1)
	})
}

export const orgChart = (data, state) => {
	const result = []
	loop(data, result)
	return result
} 