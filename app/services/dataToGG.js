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