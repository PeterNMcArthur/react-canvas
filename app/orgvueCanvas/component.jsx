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
	}

	componentDidMount() {
		const canvas = this.canvasEl 
		canvas.width = 1920
		canvas.height = 1080
		this.ctx = canvas.getContext("2d")
		this.ctx.fillStyle = "white"
		this.ctx.fillRect(0, 0, canvas.width, canvas.height)
		this.getData()
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

	render() {
		return (<canvas className="orgvue-canvas" ref={ i => this.canvasEl = i }/>)
	}

}