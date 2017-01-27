const Canvas = require("coracle").dom.Canvas
import { orgChart } from "./../services/dataToGG" 

export const coracleRender = (ctx, state) => {
	const canvas = new Canvas(ctx)
	const drawData = orgChart(state.data)
	canvas.render(drawData)
	return canvas
}