const Canvas = require("coracle").dom.Canvas

export const coracleRender = (ctx) => {
	const canvas = new Canvas(ctx)
	canvas.render([
		[
		{
			shapes: "Rect",
			width: 200,
			height: 90,
			fill: 0xFF7F3F
		},
		{
			transforms: [
			{
				transforms: "Translate",
				x: 100,
				y: 10
			}
			]
		}
		]
		])
	return canvas
}