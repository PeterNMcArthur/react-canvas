"use strict"

var gizmo = require("coracle").graphics.gizmo
var trampoline = require("coracle").lang.trampoline

trampoline.init(gizmo.render)(cmds => {
  console.log(cmds)
}, [
  {
    shapes: "Bar"
  }
])
