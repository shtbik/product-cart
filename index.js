const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('./webpack.config')
const Express = require('express')

const bodyParser = require('body-parser')

const app = new Express()
const port = process.env.PORT || 3000

const compiler = webpack(config)

app.use(
	webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath, lazy: false })
)
app.use(webpackHotMiddleware(compiler))

app.use(bodyParser.json())
app.get('*', function(request, response) {
	response.sendFile(__dirname + '/index.html')
})

app.post('/api/post', function(req, res) {
	const status = {
		code: 200,
		message: 'Ответ от API успешно получен',
	}
	res.json(status)
})

// Сделано для того, чтобы отделить get и post запросы. На get запрос отдает код странички html
app.post('/api/get', function(req, res) {
	const status = {
		code: 200,
		message: 'Ответ от API успешно получен',
	}
	res.json(status)
})

app.listen(port, function() {
	console.log(
		'Express server listening on port %d in %s mode',
		this.address().port,
		app.settings.env
	)
})
