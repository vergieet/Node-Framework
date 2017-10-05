const express = require('express')
const fs = require('fs')
const route = require('./config/route.json')
const app = express()

app.get('*', function (req, res) {
  res.send('Hello World!' + route[req.url])
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
