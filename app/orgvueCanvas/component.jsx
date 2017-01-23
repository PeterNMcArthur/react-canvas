import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import * as draw from "./../draw/shapes"
import testData from './../../testData.json'

export default class OrgvueCanvas extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const canvas = this.canvasEl 
		this.ctx = canvas.getContext("2d")
		this.ctx.fillStyle = "white"
		this.ctx.fillRect(0, 0, canvas.width, canvas.height)
		this.getData()
	}

	getData() {

		const containers = testData[0][0]
		const transformers = testData[0][1]
		this.processContainer(containers)

	}

	process(obj) {
		const keys = Object.keys(obj)
	}

	processContainer(containers) {
		return containers.elements.map(container => {
			const element = container[0]
			const transformer = container[0]
			if (element) draw.rectangle(this.ctx, element)
			return container
		})
	}

	componentDidUpdate(prevProps, prevState) {
		
	}

	render() {
		return (<canvas className="orgvue-canvas" ref={ i => this.canvasEl = i }/>)
	}

}