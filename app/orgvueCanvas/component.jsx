import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as draw from "./../draw/shapes"
import testData from './../../testData.json'
import { coracleRender } from './../draw/coracle'

const shapeMapper = {
	"Rect": "rectangle"
}

export default class OrgvueCanvas extends Component {

	constructor(props) {
		super(props)
		this.handleMouseDown = this.handleMouseDown.bind(this)
		this.handleMouseUp = this.handleMouseUp.bind(this)
		this.handleDrag = this.handleDrag.bind(this)

		this.state = {
			dragging: {
				x: null,
				y: null,
				isActive: false
			},
			position: {
				x: 0,
				y: 0
			}
		}
	}

	componentDidMount() {
		const canvas = this.canvasEl 
		canvas.width = 1920
		canvas.height = 1080
		this.ctx = canvas.getContext("2d")
		this.ctx.fillStyle = "white"
		this.ctx.fillRect(0, 0, canvas.width, canvas.height)

		this.getData()

		this.canvasEl.addEventListener('mousedown', this.handleMouseDown)
		this.canvasEl.addEventListener('mouseup', this.handleMouseUp)
		this.canvasEl.addEventListener('mouseleave', this.handleMouseUp)	

	}

	componentWillUnmount() {
		this.canvasEl.removeEventListener('mousemove', this.handleDrag)
		this.canvasEl.removeEventListener('mousedown', this.handleMouseDown)
		this.canvasEl.removeEventListener('mouseup', this.handleMouseUp)
	}	

	componentDidUpdate(prevProps, prevState) {
		const didDataUpdate = JSON.stringify(prevState.data) !== JSON.stringify(this.state.data)
		if ((this.state.data && didDataUpdate) || this.state.dragging.isActive) this.drawFrame()
	}

	getData() {

		const httpOptions = {
			headers: new Headers({
				'Content-Type': 'text/plain',
				"X-Uploader-Version": "1.10.0",
				"X-Accept-Encoding": "none"
			}),
			method: "post",
			body: `
			var f = n => {
				return {
					name: n.FullName,
					children: n.children.map(f)

				}
			}

			resource.view("1505 dataset").nodes().filter(n => n.parent.isBlank).map(f)
			`	
		}

		fetch("/getData", httpOptions)
		.then(res => res.json())
		.then(data => this.setState( Object.assign({}, this.state, { data: data.data.result }) ))
	}

	handleMouseDown(e) {
		const newState = Object.assign({}, this.state, {
			dragging: {
				x: e.screenX,
				y: e.screenY,
				isActive: true
			}
		})
		this.setState(newState)
		this.canvasEl.addEventListener('mousemove', this.handleDrag)
	}

	handleMouseUp(e) {
		this.canvasEl.removeEventListener('mousemove', this.handleDrag)
		const newState = Object.assign({}, this.state, {
			dragging: {
				x: null,
				y: null,
				isActive: false
			}
		})
		this.setState(newState)
	}

	handleDrag(e) {
		if (!this.state.dragging.isActive) return
			const newX = (e.screenX - this.state.dragging.x)
		const newY = (e.screenY - this.state.dragging.y)
		this.state.position.x = this.state.position.x + newX
		this.state.position.y = this.state.position.y + newY
		const newState = Object.assign({}, this.state, {
			dragging: {
				x: this.state.dragging.x + newX,
				y: e.screenY,
				isActive: true
			}
		})
		this.setState(newState)
	}

	drawFrame() {
		const t1 = performance.now()  
		coracleRender(this.canvasEl, this.state)
		const t2 = performance.now()  
		console.log(t2 - t1)
	}

	render() {
		return (
			<div>
			<pre>{JSON.stringify(this.state.dragging, null, 2), JSON.stringify(this.state.dragging, null, 2)}</pre>
			<canvas className="orgvue-canvas" ref={ i => this.canvasEl = i }/>
			</div>
			)
	}

}