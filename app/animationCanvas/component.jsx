import React, { Component } from 'react'

export default class Canvas extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.draw(0, 0)
	}

	draw(x, y) {
		const ctx = this.canvasEl.getContext("2d")	
		const [ width, height] = [ window.innerWidth, window.innerHeight ]
		this.canvasEl.width = width
		this.canvasEl.height = height
		ctx.width = 1920
		ctx.height = 1080 * 1920 / 1080
		if (x > width) x = 0
		if (y > height) y = 0
		ctx.clearRect(0,0, 1920, 1080)
		ctx.fillStyle = "red"
		ctx.fillRect(x,y,20,20)
		setTimeout(() => this.draw(x + 5, y + 5), 100)
		}

		render() {
			return <canvas ref={ i => this.canvasEl = i } ></canvas>
		}
	}