var webpack = require('webpack')
var express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
var fs = require('fs')
var _ = require('lodash')

var app = new (express)()
var port = 3001

app.use(cors())
app.use(bodyParser.json())

app.get('*', function(req, res){
	res.json({type: 'get'})
})

app.post('/api/config', function( req, res ){
	var data = _.get(req.body, 'data', null)
	var key = _.get(req.body, 'key', null)
	var status = {code: 200, message: 'all_good'}

	if( data && key ) {
		var path = `./src/data/${key}.json`
		fs.writeFile( path, JSON.stringify(data), function(err) {
			if( err ) {
				status.code = 500
				status.message = err
			}
		})
	} else {
		status.code = 500
		status.message = 'empty_param'
	}

	res.json(status)
})

app.post('/api/locale', function( req, res ){

	var data = req.body.data
	var section = req.body.section
	var langs = ['ru', 'en']
	var docs = {}

	_.each( langs, lang => {
		docs[lang] = {}
		docs[lang].path = `./src/locale/${lang}/${section}.json`
		docs[lang].data = {}

		_.each( data, datum => {
			var key = datum.key
			var value = datum.values[lang]
			docs[lang].data[key] = value
		})
	})

	_.each( docs, (doc) => {
		fs.writeFile( doc.path, JSON.stringify(doc.data), function(err) {
			if( err ) console.log(err);
			else console.log('The file was saved');
		})
	})

	console.log(docs)
	console.log(req.body)
	res.json(req.body)
})

app.listen(port, function(error) {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
})