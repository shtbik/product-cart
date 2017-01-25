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

app.use(express.static('static'))
app.use(bodyParser.json())
app.get('*', function(request, response){
  response.sendFile(__dirname + '/static/index.html')
})

app.post('/reg', function(req, res) {
	var status = {
		code: 200,
		message: 'Пользователь успешно создан'
	}
	var pathUsers = './src/js/configs/users.js'
	var dataUsers = req.body
	var configJSON = JSON.stringify(dataUsers);

	if (dataUsers) {
		fs.readFile(pathUsers, {encoding: 'utf8'}, function (err, data) {
			if(err) {
				status.code = 500
				status.message = 'Ошибка чтения файла'
				res.json(status)
			} else {
				var config = JSON.parse(data)
				config.push(dataUsers)
				var configJSON = JSON.stringify(config)
				fs.writeFileSync(pathUsers, configJSON)
				status.newUsers = config
				res.json(status)
			}
		})
	} else {
		status.code = 500
		status.message = 'Ошибка, пользователь не создан'
		res.json(status);
	}
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

app.listen(port, function(error) {
	if (error) {
		console.error(error)
	} else {
		console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
	}
})