const fs = require('fs')
const path = require('path')

const debug = require('debug')('magic:cmd')
const verbose = require('debug')('magic-verbose:cmd')

const defaults = {
  port:8080,
  proxy:false,
  https:false,
  offline:false,
  html:false,
  webpackconfig:false,
  deploy:false,
  ssr:false,
  cwd:null, //"../automagical-react",
  embed:false,
  packagejson:{version:'0', devDependecies:[], dependencies:[], name:''}
}

module.exports = () => {
  var cwd = cwd || path.resolve('./')
  var args = process.argv.slice(',')

  while(args.length !== 0 && (args[0] || '').indexOf('--') === -1) {
    args.shift()
  }

  args = (args || []).reduce((obj, val, i, arr) => {
    if (val.indexOf('--') === 0){
      return Object.assign(obj, {[val.slice(2)]:(arr[i+1] || true)})
    } else {
      return obj
    }
  }, {})
  Object.keys(args).map(key => {
    if (args[key].toLowerCase() === 'true') {
      return args[key] = true
    }
    if (args[key].toLowerCase() === 'false') {
      return args[key] = false
    }
  })
  

  debug(`cwd: ${cwd}`)

  if (fs.existsSync(`${cwd}/package.json`)) {
    packagejson = require(`${cwd}/package.json`)
  } else {
    debug(`no package found at ${cwd}/package.json`)
  }

  debug(`${cwd}/${args.webpackconfig}`, fs.existsSync(`${cwd}/${args.webpackconfig}`))
  if (args.webpackconfig && fs.existsSync(`${cwd}/${args.webpackconfig}`)){
    args.webpackconfig = require(`${cwd}/${args.webpackconfig}`)
  }

  let config = Object.assign(defaults, args, {packagejson, "cwd":cwd})

  // console.log(`args: ${JSON.stringify(config, undefined, 2)}`)
  return config
}
