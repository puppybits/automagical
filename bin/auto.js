#!/usr/bin/env node
'use strict'
const fs = require('fs')
const path = require('path')

const automagical = require(path.join(__dirname, '..', 'src', 'index.js'))
const options = process.argv
automagical()

// checks for available update and returns an instance
var pkg = JSON.parse(fs.readFileSync(__dirname + '/../package.json'))

// require('update-notifier')({
//   pkg: defaults(pkg, { version: '0.0.0' }),
// }).notify()
