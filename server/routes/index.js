const routes = require("express").Router()
const path = require("path")
const request = require('request-promise')

routes.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html')))

module.exports = routes
