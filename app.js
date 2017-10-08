const express = require('express')
const fs = require('fs')
const globalConfig = require('./config/global.json')
const route = require('./' + globalConfig['file']['route'])
const app = express()
app.set('view engine', 'pug')

app.get('*', function (req, res) {
  var routeUrl = req.url + '';
  if(typeof route[routeUrl] == 'undefined'){
    if(routeUrl.charAt(routeUrl.length-1) == "/")
    routeUrl = routeUrl.slice(0, routeUrl.length -1)
    else
    routeUrl = routeUrl + "/" ;
  }
  if(!route[routeUrl])res.send('Hello 404!')
  pageConfig = require('./' + globalConfig['dir']['config-page'] + route[routeUrl])
  res.send(pageConfig)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
