var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')

var app = new (express)()
var port = process.env.PORT || 3000
var env = process.env.NODE_ENV || 'production'

var compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {noInfo: true, publicPath: config.output.publicPath, lazy: false}))
app.use(webpackHotMiddleware(compiler))

app.use(express.static('./'))
app.use(bodyParser.json())
app.get('*', function(request, response) {
  					response.sendFile(__dirname + '/index.html')
})

app.post('/api/post', function(req, res) {
	var status = {
		code: 200,
		message: 'Ответ от API успешно получен'
	}
	res.json(status);
})

// Сделано для того, чтобы отделить get и post запросы. На get запрос отдает код странички html
app.post('/api/get', function(req, res) {
	var status = {
		code: 200,
		message: 'Ответ от API успешно получен'
	}
	res.json(status);
})

app.listen(port, function() {
  					console.log('Express server listening on port %d in %s mode', this.address().port, app.settings.env);
});
