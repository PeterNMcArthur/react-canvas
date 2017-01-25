const routes = require("express").Router()
const path = require("path")
const request = require('request-promise')
const creds = require("./../../credentials") 
routes.get('/', (req, res) => res.sendFile(path.join(__dirname, '../../public/index.html')))
routes.post('/getData', (req, res) => {

	if(!creds.username || !creds.password) {
		res.json({ data: {
			"err": "401",
			"msg": "Please make sure you have a json file in the root of this app called credentials which has a property of username and password"
		}})
		return
	}
	const auth = "Basic " + new Buffer(`${ creds.username }:${ creds.password }`).toString("base64")

	const options = {
		headers: {
			"Authorization" : auth,
			"Content-Type": "application/text",
			"X-Uploader-Version": "1.10.0",
			"X-Accept-Encoding": "none"
		},
		uri: "https://orgvuedemo.concentra.co.uk/ROD-D79C/gizmo",
		method: "POST",
		body: req.body
	}	

	request(options)
	.then(function (parsedBody) {
		res.json({ data: JSON.parse(parsedBody)})
	})
	.catch(function (err) {
		res.json({ data: "Something went wrong! :(", "msg": err.message})
	})

})

module.exports = routes
