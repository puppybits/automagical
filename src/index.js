const server = require('./server/')
const webpack = require('webpack')
const generateconfig = require('./webpack.config/')
const args = require('./cmd/cmd')
const debug = require('debug')('magic:index')

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET
console.log('index')
module.exports = () => {

  const settings = args() || {}

  const webpackconfig = generateconfig(settings)

  debug(webpackconfig)

  if (settings.devServer) {
    server(webpackconfig, settings.port || 8080)
  } else {
    console.log(webpack(webpackconfig).run(err => console.log(err)))
  }
}
