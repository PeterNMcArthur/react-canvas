import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class OrgvueCanvas extends Component {
	constructor(props) {
		super(props)
	}

	componentDidMount() {
		const canvas = this.canvasEl 
		const ctx = canvas.getContext("2d")
		ctx.fillStyle = "white"
		ctx.fillRect(0, 0, canvas.width, canvas.height)
	}

	componentDidUpdate(prevProps, prevState) {
		
	}

	render() {
		return (<canvas className="orgvue-canvas" ref={ i => this.canvasEl = i }/>)
	}

}