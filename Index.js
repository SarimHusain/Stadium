var express = require('express')
const fs = require('fs')
const path = require('path')

const server = express()

// import db
const db = require('./Database')

// process.env.USER

server.listen(6000, async ()=>{
  // Create db connection
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})

// -----------------------------------

server.get('/', (_, res)=>{
  // render home
  // res.render('home')
  res.send('Running')
})

server.post('/users', async (_, res)=>{
  // extract params from req
  // build query
  // run query

  const { QueryTypes } = require('sequelize');
  try {
    const users = await db.query("SELECT * FROM `student`", { type: QueryTypes.SELECT });
    res.send(users)
  } catch (error) {
    res.send(error) 
  }
})


