<html>
<head>
  <title>Canvas test</title>
</head>
<body onload="onLoad()" style="margin: 0px; overflow: hidden; position: absolute;">
  <!--svg width="300" height="200">
    <g transform="translate(0, 0)">
      <g transform="translate(0, 0)">
        <rect x="10" y="10" width="180" height="180" rx="8" ry="8" fill="white" stroke="#FF7F3F" stroke-width="4" />
        <circle cx="173" cy="27" r="8" fill="#FF7F3F" />
        <text x="18" y="34" font-family="Arial" font-size="20">Justin Time</text>
        <text x="18" y="49" font-family="Arial" font-size="14">Vice President</text>
        <g transform="translate(0, 64)">
          <text x="18" y="11" font-family="Arial" font-size="11">Department</text>
          <text x="182" y="11" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">sales</text>
          <text x="18" y="23" font-family="Arial" font-size="11">Age</text>
          <text x="182" y="23" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">37</text>
          <text x="18" y="35" font-family="Arial" font-size="11">Grade</text>
          <text x="182" y="35" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">5-middle</text>
          <text x="18" y="47" font-family="Arial" font-size="11">Area</text>
          <text x="182" y="47" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">North Carolina</text>
          <text x="18" y="59" font-family="Arial" font-size="11">Licence to kill</text>
          <text x="182" y="59" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">Expired</text>
        </g>
      </g>
      <g transform="translate(200, 0)">
        <rect x="10" y="10" width="180" height="180" rx="8" ry="8" fill="white" stroke="#00AA00" stroke-width="4" />
        <circle cx="173" cy="27" r="8" fill="#00AA00" />
        <text x="18" y="34" font-family="Arial" font-size="20">Justin Time</text>
        <text x="18" y="49" font-family="Arial" font-size="14">Vice President</text>
        <g transform="translate(0, 64)">
          <text x="18" y="11" font-family="Arial" font-size="11">Department</text>
          <text x="182" y="11" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">sales</text>
          <text x="18" y="23" font-family="Arial" font-size="11">Age</text>
          <text x="182" y="23" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">37</text>
          <text x="18" y="35" font-family="Arial" font-size="11">Grade</text>
          <text x="182" y="35" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">5-middle</text>
          <text x="18" y="47" font-family="Arial" font-size="11">Area</text>
          <text x="182" y="47" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">North Carolina</text>
          <text x="18" y="59" font-family="Arial" font-size="11">Licence to kill</text>
          <text x="182" y="59" font-family="Arial" font-size="11" text-anchor="end" font-weight="bold">Expired</text>
        </g>
      </g>
    </g>
  </svg-->
  <canvas id="canvas" style="position: relative;"></canvas>
  <canvas id="temp" width="1500" height="60" style="display: none;"></canvas>
  <div id="tooltip" style="position: absolute; top: 0px; background-color: #EEEEEE; padding: 2px;">---</div>

  <script type="text/javascript">
    var N = Math.ceil(Math.sqrt(100000))
    var RES = window.location.href.match(/RES=1/) ? 1 : 2
    console.log(RES)

    var g, W, H
    var data, drag, interactions, scale, translate

    function onLoad() {
      var c, i

      W = 1920 * RES
      H = 1080 * RES
      document.getElementById('canvas').width = W
      document.getElementById('canvas').height = H
      document.getElementById('canvas').style.left = -(RES - 1) * W / (RES * RES)
      document.getElementById('canvas').style.top = -(RES - 1) * H / (RES * RES)
      document.getElementById('canvas').style.transform = "scale(" + (1 / RES) + ")"

      g = document.getElementById('canvas').getContext("2d")

      data = []
      for (i = 0; i < N * N; i++) {
        c = (Math.random() * 0xFFFFFF) | 0
        c = c.toString(16)
        while (c.length < 6) {
          c = "0" + c
        }
        data.push("#" + c)
      }

      scale = RES
      translate = [0, 0]
      document.getElementById('canvas').onmousedown = e => {
        drag = [RES * e.clientX - translate[0], RES * e.clientY - translate[1]]
      }

      document.getElementById('canvas').onmousemove = e => {
        var i, t, x, y
        // document.getElementById("tooltip").innerHTML = data[
        //   (((RES * e.clientX / scale - translate[0]) / 200) | 0) +
        //   N * (((RES * e.clientY / scale - translate[1]) / 200) | 0)
        // ]

        x = RES * e.clientX
        y = RES * e.clientY
        document.getElementById("tooltip").innerHTML = (N * N) + " items"
        for (i = interactions.length - 1; i >= 0; i--) {
          t = interactions[i]
          if (x >= t[0] && x < (t[0] + t[2]) && y >= t[1] && y < (t[1] + t[3])) {
            document.getElementById("tooltip").innerHTML = t[4]
            break
          }
        }

        if (!drag) return

        translate = [RES * e.clientX - drag[0], RES * e.clientY - drag[1]]
        render()
      }

      document.getElementById('canvas').onmouseup = e => {
        drag = undefined
      }

      document.getElementById('canvas').onmousewheel = e => {
        var f

        f = 1 + 0.05 * e.wheelDelta / 30
        translate = [
          W / 2 + f * (translate[0] - W / 2),
          H / 2 + f * (translate[1] - H / 2)
        ]
        scale *= f
        render()
      }

      render()
    }

    function render() {
      var fancy, i, x, y

      const fx = x => translate[0] + scale * x
      const fy = y => translate[1] + scale * y
      const fs = s => scale * s

      g.clearRect(0, 0, W, H)
      fancy = []

      interactions = []
      for (i = 0; i < N * N; i++) {
        x = 200 * (i % N)
        y = 200 * ((i / N) | 0)

        if (fx(x + 200) < 0 || fx(x) >= W) continue
        if (fy(y + 200) < 0 || fy(y) >= H) continue

        // rounded rect
        g.beginPath()
        g.strokeStyle = data[i]
        g.lineWidth = fs(4)
        roundedrect(fx(x + 10), fy(y + 10), fs(180), fs(180), fs(8))
        g.stroke()
        interactions.push([fx(x + 10), fy(y + 10), fs(180), fs(180), data[i]])

        if (fs(8) > 4) {
          g.beginPath()
          g.fillStyle = data[i]
          g.arc(fx(x + 173), fy(y + 27), fs(8), 0, 2 * Math.PI)
          g.fill()
        }

        g.fillStyle = "black"

        // titles
        if (fs(20) < 5) continue
        fancy.push({
          size: fs(20),
          text: "Justin Time",
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 34))
        })

        if (fs(14) < 5) continue
        fancy.push({
          size: fs(14),
          text: data[i],
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 49))
        })
        // g.font = fs(14) + "px Arial"
        // g.fillText(data[i], fx(x + 18), fy(y + 49))

        // properties
        if (fs(11) < 5) continue
        fancy.push({
          size: fs(11),
          text: "Department",
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 64 + 11))
        })
        fancy.push({
          size: fs(11),
          text: "Age",
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 64 + 23))
        })
        fancy.push({
          size: fs(11),
          text: "Grade",
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 64 + 35))
        })
        fancy.push({
          size: fs(11),
          text: "Area",
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 64 + 47))
        })
        fancy.push({
          size: fs(11),
          text: "Licence to kill",
          x: Math.round(fx(x + 18)),
          y: Math.round(fy(y + 64 + 59))
        })
        g.font = fs(11) + "px Arial"

        g.font = "bold " + fs(11) + "px Arial"
        g.fillText("sales", fx(x + 182) - g.measureText("sales").width, fy(y + 64 + 11))
        interactions.push([fx(x + 182)- g.measureText("sales").width, fy(y + 64 + 11 - 11), g.measureText("sales").width, fs(11), "sales"])
        g.fillText("37", fx(x + 182) - g.measureText("37").width, fy(y + 64 + 23))
        interactions.push([fx(x + 182)- g.measureText("37").width, fy(y + 64 + 23 - 11), g.measureText("37").width, fs(11), "37"])
        g.fillText("5-middle", fx(x + 182) - g.measureText("5-middle").width, fy(y + 64 + 35))
        interactions.push([fx(x + 182)- g.measureText("5-middle").width, fy(y + 64 + 35 - 11), g.measureText("5-middle").width, fs(11), "5-middle"])
        g.fillText("North Carolina", fx(x + 182) - g.measureText("North Carolina").width, fy(y + 64 + 47))
        interactions.push([fx(x + 182)- g.measureText("North Carolina").width, fy(y + 64 + 47 - 11), g.measureText("North Carolina").width, fs(11), "North Carolina"])
        g.fillText("Expired", fx(x + 182) - g.measureText("Expired").width, fy(y + 64 + 59))
        interactions.push([fx(x + 182)- g.measureText("Expired").width, fy(y + 64 + 59 - 11), g.measureText("Expired").width, fs(11), "Expired"])
      }

      renderFancy(fancy)
    }

    function renderFancy(xs) {
      var c, dat, i, img, lf, s, t, txt, temp, w, x, y

      for (i = 0; i < xs.length; i++) {
        txt = xs[i]
        if (RES === 2 || txt.size > 12) {
          g.font = txt.size + "px Arial"
          // g.fillStyle = "red"
          g.fillText(txt.text, txt.x, txt.y)
        }
      }

      temp = document.getElementById("temp").getContext("2d")
      img = g.getImageData(0, 0, W, H)

      for (i = 0; i < xs.length; i++) {
        txt = xs[i]

        if (RES === 2 || txt.size > 12) {
          continue
        }

        temp.font = (3 * txt.size) + "px Arial"
        w = Math.ceil(temp.measureText(txt.text).width / 3)
        temp.clearRect(0, 0, 1500, 60)
        temp.fillText(txt.text, 0, 0.83 * 3 * txt.size)

        lf = 4 * 3 * w
        dat = temp.getImageData(0, 0, 3 * w, 3 * Math.ceil(txt.size)).data
        for (y = 0; y < Math.ceil(txt.size); y++) {
          for (x = 0; x < w; x++) {
            for (c = 0; c < 3; c++) {
              s = 4 * (3 * w * 3 * y + 3 * x) + 3
              t = 4 * (W * (y + txt.y - Math.ceil(txt.size)) + x + txt.x)
              img.data[t + c] = 255 - Math.round((
                dat[s] + 2 * dat[s + 4] + 3 * dat[s + 8] + 2 * dat[s + 12] + dat[s + 16] +
                dat[s + lf] + 2 * dat[s + lf + 4] + 3 * dat[s + lf + 8] + 2 * dat[s + lf + 12] + dat[s + lf + 16] +
                dat[s + 2*lf] + 2 * dat[s + 2*lf + 4] + 3 * dat[s + 2*lf + 8] + 2 * dat[s + 2*lf + 12] + dat[s + 2*lf + 16]
              ) / 27)
            }

            img.data[t + 3] = 255
          }
        }
      }

     if (RES === 1) g.putImageData(img, 0, 0)
    }

    function roundedrect(x, y, w, h, r) {
      if (w < 50 || h < 50) {
        g.rect(x, y, w, h)
        return
      }

      g.moveTo(x + r, y)
      g.lineTo(x + w - r, y)
      g.quadraticCurveTo(x + w, y, x + w, y + r)
      g.lineTo(x + w, y + h - r)
      g.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
      g.lineTo(x + r, y + h)
      g.quadraticCurveTo(x, y + h, x, y + h - r)
      g.lineTo(x, y + r)
      g.quadraticCurveTo(x, y, x + r, y)
    }
  </script>
</html>
