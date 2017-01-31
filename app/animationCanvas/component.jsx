import React, { Component } from 'react'
import move from "./actions/movement"
import randomHex from "./../services/randomColor"

export default class Canvas extends Component {

	constructor(props) {
		super(props)
		this.handleKeyDown = this.handleKeyDown.bind(this)
		this.state = {
			player: {
				size: 20,
				color: randomHex(),
				position: {
					x: 0,
					y: 0
				}
			},
			stage: {
				zoom: 1,
				pan: {
					x: 0,
					y: 0
				}
			}
		}
	}

	componentDidMount() {
		const [ width, height] = [ window.innerWidth, window.innerHeight ]
		window.addEventListener('keydown', this.handleKeyDown)
		this.canvasEl.width = width
		this.canvasEl.height = height
		this.ctx = this.canvasEl.getContext("2d")	
		this.draw()
	}

	componentDidUpdate() {
		this.draw()
	}

	draw() {
		const [ width, height] = [ window.innerWidth, window.innerHeight ]
		const { zoom, pan } = this.state.stage
		const { position, size, color } = this.state.player
		const { x, y } = position
		this.ctx.save()
		this.ctx.setTransform(1,0,0,1,0,0)
		// Will always clear the right space
		this.ctx.clearRect(0,0, this.ctx.canvas.width, this.ctx.canvas.height)
		this.ctx.restore()
		this.ctx.save()
		//this.ctx.scale(zoom, zoom)
		//this.ctx.translate(pan.x, pan.y)
		this.ctx.setTransform(zoom, 0, 0, zoom, pan.x, pan.y)
		if (x > width) return
		if (y > height) return
		this.ctx.width = 1920
		this.ctx.height = 1080 * 1920 / 1080
		this.ctx.fillStyle = color
		this.ctx.fillRect(x, y, size, size)
		for (let i = 1; i < 1000; i++) {
			this.ctx.strokeStyle = 'green'
			this.ctx.strokeRect((120 * i), 10, 100, 100)
		}
		this.ctx.restore()
	}

	zooming(zoom) {
		zoom = parseFloat(zoom.toFixed(2))
		const newStage = Object.assign({}, this.state.stage, { zoom })
		const newState = Object.assign({}, this.state, { stage: newStage })
		this.setState(newState)
	}

	panning(direction) {
		const { x, y } = this.state.stage.pan
		let pan
		if (direction === "right") pan = { x: x + 10, y }
		if (direction === "left") pan = { x: x - 10, y }
		const newStage = Object.assign({}, this.state.stage, { pan })
		const newState = Object.assign({}, this.state, { stage: newStage }) 
		this.setState(newState)
	}

	handleKeyDown({ keyCode }) {
		const { zoom } = this.state.stage
		const { position, size } = this.state.player
		const { x, y } = position
		if (keyCode === 189) this.zooming( zoom - 0.2 ) 
		if (keyCode === 187) this.zooming( zoom + 0.2 )
		if (keyCode === 68) this.panning( "right" )
		if (keyCode === 65) this.panning( "left" )
		if (keyCode === 37) move.call(this, { x: x - size, y })	
		if (keyCode === 38) move.call(this, { x, y: y - size })	
		if (keyCode === 39) move.call(this, { x: x + size, y })	
		if (keyCode === 40) move.call(this, { x, y: y + size })	
	}

	render() {
		return <canvas ref={ i => this.canvasEl = i } ></canvas>
	}
}
