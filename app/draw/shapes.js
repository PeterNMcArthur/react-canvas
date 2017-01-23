import { intToRGBA } from "./../services/color"

const strokeShape = (ctx, fill, stroke, strokeOpacity, strokeWidth) => {
	const color = intToRGBA(fill, 1)
	ctx.lineWidth = stroke
	ctx.strokeStyle = fill
    ctx.stroke()
}

const fillShape = (ctx, fill) => {
	const color = intToRGBA(fill, 1)
	ctx.fillStyle = color
	ctx.fill()
}

export const roundedRectangle = (ctx, { x, y, width, height, radius, color, stroke }) => {
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
    strokeShape(ctx, color, stroke)
}

export const rectangle = (ctx, { _bottom, _left, _right, _top, fill, fillOpacity, height, interactions, scope, shapes, stroke, strokeOpacity, strokeWidth, title, width, x, y }) => {
	ctx.beginPath()
	ctx.rect(x, y, width, height)
	ctx.translate(0, 48)
	fillShape(ctx, fill)
	strokeShape(ctx, fill, stroke, strokeOpacity, strokeWidth) 
}