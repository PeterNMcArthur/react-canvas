import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as draw from "./../draw/shapes"
import testData from './../../testData.json'

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
			currentData: [],
			dragging: {
				x: null,
				y: null,
				isActive: false
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

		this.canvasEl .addEventListener('mousedown', this.handleMouseDown)
		this.canvasEl.addEventListener('mouseup', this.handleMouseUp)
		this.canvasEl.addEventListener('mouseleave', this.handleMouseUp)	


		const httpOptions = {
			auth: "peter.mcarthur@googlemail.com:Agsd3298",
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
		.then((res) => res.json())
		.then(function(myBlob) {
			console.log(myBlob)
		})

	}

	componentWillUnmount() {
		this.canvasEl.removeEventListener('mousemove', this.handleDrag)
		this.canvasEl.removeEventListener('mousedown', this.handleMouseDown)
		this.canvasEl.removeEventListener('mouseup', this.handleMouseUp)
	}	

	getData() {
		const containers = testData[0][0]
		const transformers = testData[0][1]
		console.log(containers)
		this.processContainer(containers)
	}

	processContainer(containers) {
		return containers.elements.map(container => {
			const element = container[0]
			const transforms = container[1]
			const shape = shapeMapper[element.shapes]
			if (element) draw[shape](this.ctx, element)
				return container
		})
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
		this.stage.position.x = this.stage.position.x + newX
		this.stage.position.y = this.stage.position.y + newY
		const newState = Object.assign({}, this.state, {
			dragging: {
				x: this.state.dragging.x + newX,
				y: e.screenY,
				isActive: true
			}
		})
		this.setState(newState)
		this.drawFrame()
	}

	drawFrame() {

	}

	render() {
		return (<canvas className="orgvue-canvas" ref={ i => this.canvasEl = i }/>)
	}

}