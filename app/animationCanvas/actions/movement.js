	export default function (newPosition) {
		const { player } = this.state
		const newPlayer = Object.assign({}, player, { position: newPosition } )
		const newState = Object.assign({}, this.state, { player: newPlayer})
		this.setState(newState)
	}


