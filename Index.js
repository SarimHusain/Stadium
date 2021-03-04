var express = require('express')
const fs = require('fs')
const path = require('path')

const server = express()

// import db

// process.env.USER

server.listen(8000, ()=>{
  // Create db connection
  // db.connect()
})

// -----------------------------------

server.get('/', ()=>{
  // render home
})

server.post('/users', ()=>{
  // extract params from req
  // build query
  // run query
})


