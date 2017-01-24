"use strict"

var Canvas = require("coracle").dom.Canvas


var canvas = new Canvas(document.getElementById("canvas"))

canvas.render([
  [
    {
      shapes: "Rect",
      width: 200,
      height: 90,
      fill: 0xFF7F3F
    },
    {
      transforms: [
        {
          transforms: "Translate",
          x: 100,
          y: 10
        }
      ]
    }
  ]
])
