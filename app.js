const express = require('express')
const fs = require('fs')
const globalConfig = require('./config/global.json')
const route = require('./' + globalConfig['file']['route'])
const app = express()

app.get('*', function (req, res) {
  if(!route[req.url])res.send('Hello 404!')
  pageConfig = require('./' + globalConfig['dir']['page-config'] + route[req.url])
  res.send(pageConfig)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
