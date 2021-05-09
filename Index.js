var express = require('express');
const fs = require('fs');
const path = require('path');
const handle = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');

const Employee = require('./models/Employee');
const Event = require('./models/Event');
const Seats = require('./models/seats');
const User = require('./models/User');

const server = express()

const APIRouter = require('./routes/router')
const db = require('./Database');
const UserRouter = require('./routes/user');
const { QueryTypes } = require('sequelize');


// process.env.USER
server.use(methodOverride('_method'));
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

server.use('/api', APIRouter);
server.use('/user', UserRouter);

// -----------------------------------

// -----------------------------------
server.get('/', (_, res)=>{
  // render home
  res.render('home',{title: 'IGI Stadium'})
})

server.get('/booking', (_, res)=>{
  // render booking
  res.render('booking',{title: 'Bookings'})
})

server.get('/employees', (_, res)=>{
  // render home
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then( 
    function (results) {
      res.render('employees',{title: 'AdminEmployee', results})
    }
  )
})

server.post('/employees', (req,res)=>{
  console.log(req.body.cat);
  if(req.body.cat=="Name")
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then( 
    function (results) {
      res.render('employees',{title: 'AdminEmployee', results, Name: true})
    }
  )
  else if(req.body.cat=="Employee ID")
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then( 
    function (results) {
      res.render('employees',{title: 'AdminEmployee', results, EmployeeID: true})
    }
  )
})

server.post('/employees/Name', (req,res)=>{
  console.log(req.body.name)
  var n = req.body.name
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then(
    function (results) {
      db.query("SELECT * FROM `employees` WHERE Name = :Name" , { replacements: {Name:n}, type: QueryTypes.SELECT }).then(
        function (Names) {
          res.render('employees',{title: 'AdminEmployee', results, Names, Name: true, Natb: true})
        }
      ) 
    }
)})

server.post('/employees/EmpID', (req,res)=>{
  console.log(req.body.EmpID)
  var id = req.body.EmpID
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then(
    function (results) {
      db.query("SELECT * FROM `employees` WHERE EmpID = :EmpID" , {  replacements: {EmpID:id}, type: QueryTypes.SELECT }).then(
        function (ID) {
          res.render('employees',{title: 'AdminEmployee', results, ID, EmployeeID: true, IDtb: true})
        }
      ) 
    }
)})


server.delete('/employees/:EmpID', async (req,res)=>{
  var emp = req.body.EmpID
  db.query("Delete from `employees` WHERE EmpID = emp", { type: QueryTypes.SELECT }).then((results)=>{
    res.render('employees',{title: 'AdminEmployee', results})
  })
})



server.get('/events', (_, res)=>{
  // render home
  res.render('events',{title: 'AdminEvents'})
})

server.get('/users', (_, res)=>{
  // render home
  res.render('users',{title: 'AdminUsers'})
})

server.get('/seats', (_, res)=>{
  // render home
  res.render('seats',{title: 'AdminSeats'})
})

server.post('/booking', (_,res)=>{
  res.render('booking', {title: 'Success', completion: true})
})


server.get('/admin', async (req, res)=>{
  // render admin
  const isLogin = req.cookies.login ? true : false;

  try {
    if(isLogin) {
      const userid = JSON.parse(req.cookies.login).userid;
      const empType = userid.substr(0, 2);
      const user = await Employee.findByPk(userid)
  
      if(empType == 'EM' || empType == 'em' || empType == 'Em' || empType == 'eM')
        res.render('employee')
      else if(empType == 'MC' || empType == 'mc' || empType == 'Mc' || empType == 'mC')
        res.render('manager')
      else
        throw QueryError('Unknown EMP_TYPE')
    }
    else
      res.render('admin',{title: 'Admin'})
  } catch (error) {
    return res.status(500).send(error)
  }
})

server.get('/contact', (_, res)=>{
  // render contact
  res.render('contact',{title: 'Contact Us'})
})

server.post('/contact', (_,res)=>{
  res.render('contact', {title: 'Thank you', completion: true})
})

server.post('/login', async (req, res) => {
  try {
    const check = await Employee.findByPk(req.body.id);
    if(check.length !== 0 && req.body.pw == "test") {
      res.cookie('login', JSON.stringify({ userid: req.body.id }), { httpOnly:true });
      return res.redirect('/admin');
    }
    else
      return res.status(403).redirect('/admin');
  } catch (error) {
    console.error(error)
    return res.status(500).redirect('/admin');
  }
});

server.post('/logout', (req, res) => {
  res.clearCookie('login')
  res.redirect('/admin')
})

// 

server.listen(8000, async ()=>{
  // Create db connection
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})