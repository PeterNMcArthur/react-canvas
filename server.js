const express = require('express') 
const app = express()
const path = require("path") 
const routes = require("./server/routes")

const textParser = (req, res, next) => {
	if (req.is('text/*')) {
		req.body = ''
		req.setEncoding('utf8')
		req.on('data', (chunk) => req.body += chunk)
		req.on('end', next)
	} else {
		next()
	}
}

app.use(textParser)

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// all server side routing
app.use('/', routes)

// all react-router responses 
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'public', 'index.html')) })

app.listen(3000, () => console.log('server running on http://localhost:3000'))
