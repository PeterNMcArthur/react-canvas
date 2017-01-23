import { intToHex } from "./../services/color"
export const roundedRectangle = (ctx, { x, y, width, height, radius, color, stroke }) => {

	ctx.lineWidth = stroke
	ctx.strokeStyle = color

	ctx.beginPath()
	ctx.moveTo(x + radius, y)
	ctx.lineTo(x + width - radius, y)
	ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
	ctx.lineTo(x + width, y + height - radius)
	ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
	ctx.lineTo(x + radius, y + height)
	ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
	ctx.lineTo(x, y + radius)
	ctx.quadraticCurveTo(x, y, x + radius, y)
    ctx.closePath()
    ctx.stroke()
}

export const rectangle = (ctx, { _bottom, _left, _right, _top, fill, fillOpacity, height, interactions, scope, shapes, stroke, strokeOpacity, strokeWidth, title, width, x, y }) => {
	const color = `#${ intToHex(fill) }`
	ctx.beginPath();
	ctx.rect(x, y, width, height);
	ctx.fillStyle = color
	ctx.fill();
}