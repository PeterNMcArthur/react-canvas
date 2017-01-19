const express = require('express') 
const app = express()
const path = require("path") 
const routes = require("./server/routes")

app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// all server side routing
app.use('/', routes)

// all react-router responses 
app.get('*', (req, res) => { res.sendFile(path.resolve(__dirname, 'public', 'index.html')) })

app.listen(3000, () => console.log('server running on http://localhost:3000'))
