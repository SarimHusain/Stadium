var express = require('express');
const fs = require('fs');
const path = require('path');
const handle = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const server = express()

// import db
const db = require('./Database')

// process.env.USER

server.use(cookieParser());
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded({ extended: true })); 

server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');
server.engine('hbs', handle({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir  : [__dirname + '/views/partials',
    ]
}));

server.use(express.static(path.join(__dirname, '/views/contact.hbs')));
server.use('/css', express.static(path.join(__dirname, 'views/css')));
server.use('/addons', express.static(path.join(__dirname, 'views/addons')));

server.listen(8000, async ()=>{
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
  res.render('home',{title: 'IGI Stadium'})
})

server.get('/booking', (_, res)=>{
  // render booking
  res.render('booking',{title: 'Bookings'})
})

server.get('/admin', (req, res)=>{
  // render admin
  const isLogin = req.cookies.login ? true : false;

  if(isLogin) {
    const empType = JSON.parse(req.cookies.login).userid.substr(0, 2);
    if(empType == 'EM')
      res.render('employee')
    else if(empType == 'MC')
      res.render('manager')
  }
  else
    res.render('admin',{title: 'Admin'})
})

server.get('/contact', (_, res)=>{
  // render contact
  res.render('contact',{title: 'Contact Us'})
})

server.post('/contact', (_,res)=>{
  res.render('contact',{title: 'Thank you', completion: true})
})

server.post('/login', (req, res) => {
  console.log(req.body)
  /**
   * @todo query db for existance of user
   */
  if ((req.body.id == 'MC012' || req.body.id == 'EM012') && req.body.pw == 'test') {
    res.cookie('login', JSON.stringify({ userid: req.body.id }), { httpOnly:true })
    res.redirect('/admin')
  }
  else
    res.sendStatus(403);
})

server.post('/logout', (req, res) => {
  res.clearCookie('login')
  res.redirect('/admin')
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


