"use strict"
const gizmo = require("coracle").graphics.gizmo
const trampoline = require("coracle").lang.trampoline

const options = [
{
	shapes: "Bar"
}
]

trampoline.init(gizmo.render)(cmds => console.log(JSON.stringify(cmds, null, 2)), options)
