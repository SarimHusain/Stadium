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

// For EMPLOYEES

server.get('/employees', (_, res)=>{
  // render home
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then( 
    function (employees) {
      res.render('employees',{title: 'AdminEmployee', employees})
    }
  )
})

server.post('/employees', (req,res)=>{
  console.log(req.body.cat);
  if(req.body.cat=="Name")
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then( 
    function (employees) {
      res.render('employees',{title: 'AdminEmployee', employees, Name: true})
    }
  )
  else if(req.body.cat=="Employee ID")
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then( 
    function (employees) {
      res.render('employees',{title: 'AdminEmployee', employees, EmployeeID: true})
    }
  )
})

server.post('/employees/Name', (req,res)=>{
  console.log(req.body.name)
  var n = req.body.name
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then(
    function (employees) {
      db.query("SELECT * FROM `employees` WHERE Name = :Name" , { replacements: {Name:n}, type: QueryTypes.SELECT }).then(
        function (Names) {
          res.render('employees',{title: 'AdminEmployee', employees, Names, Name: true, Natb: true})
        }
      ) 
    }
)})

server.post('/employees/EmpID', (req,res)=>{
  console.log(req.body.EmpID)
  var id = req.body.EmpID
  db.query("SELECT * FROM `employees`", { type: QueryTypes.SELECT }).then(
    function (employees) {
      db.query("SELECT * FROM `employees` WHERE EmpID = :EmpID" , {  replacements: {EmpID:id}, type: QueryTypes.SELECT }).then(
        function (ID) {
          res.render('employees',{title: 'AdminEmployee', employees, ID, EmployeeID: true, IDtb: true})
        }
      ) 
    }
)})


server.delete('/employees/:EmpID', async (req,res)=>{
  var emp = req.body.EmpID
  db.query("Delete from `employees` WHERE EmpID = emp", { type: QueryTypes.SELECT }).then((employees)=>{
    res.render('employees',{title: 'AdminEmployee', employees})
  })
})

//--------------------------------------------------------------------------------------------

// For USERS

server.get('/users', (_, res)=>{
  // render home
  db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT }).then( 
    function (users) {
      res.render('users',{title: 'AdminUsers', users})
    }
  )
})


server.post('/users', (req,res)=>{
  console.log(req.body.cat);
  if(req.body.cat=="Name")
  db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT }).then( 
    function (users) {
      res.render('users',{title: 'AdminUser', users, Name: true})
    }
  )
  else if(req.body.cat=="Event")
  db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT }).then( 
    function (users) {
      res.render('users',{title: 'AdminUser', users, Event: true})
    }
  )
})

server.post('/users/Name', (req,res)=>{
  console.log(req.body.name)
  var n = req.body.name
  db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT }).then(
    function (users) {
      db.query("SELECT * FROM `users` WHERE Name = :Name" , { replacements: {Name:n}, type: QueryTypes.SELECT }).then(
        function (Names) {
          res.render('users',{title: 'AdminUser', users, Names, Name: true, Natb: true})
        }
      ) 
    }
)})

server.post('/users/Event', (req,res)=>{
  console.log(req.body.event)
  var e = req.body.event
  db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT }).then(
    function (users) {
      db.query("SELECT * FROM `users` WHERE Event = :Event" , { replacements: {Event:e}, type: QueryTypes.SELECT }).then(
        function (events) {
          res.render('users',{title: 'AdminUser', users, events, Event: true, Etb: true})
        }
      ) 
    }
)})

server.delete('/users/:id', async (req,res)=>{
  var id = req.body.id
  db.query("Delete from `users` WHERE id = id", { type: QueryTypes.SELECT }).then((users)=>{
    res.render('users',{title: 'AdminUser', users})
  })
})

//--------------------------------------------------------------------------------------------

// For EVENTS

server.get('/events', (_, res)=>{
  // render home
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then( 
    function (events) {
      res.render('events',{title: 'AdminEvent', events})
    }
  )
})

server.post('/events', (req,res)=>{
  console.log(req.body.cat);
  if(req.body.cat=="Name")
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then( 
    function (events) {
      res.render('events',{title: 'AdminEvent', events, Name: true})
    }
  )

  else if(req.body.cat=="Event ID")
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then( 
    function (events) {
      res.render('events',{title: 'AdminEvent', events, EventID: true})
    }
  )

  else if(req.body.cat=="Cost >")
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then( 
    function (events) {
      res.render('events',{title: 'AdminEvent', events, Costg: true})
    }
  )

  else if(req.body.cat=="Cost <")
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then( 
    function (events) {
      res.render('events',{title: 'AdminEvent', events, Costl: true})
    }
  )

  else if(req.body.cat=="Cost =")
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then( 
    function (events) {
      res.render('events',{title: 'AdminEvent', events, Coste: true})
    }
  )
})

server.post('/events/Name', (req,res)=>{
  console.log(req.body.name)
  var n = req.body.name
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then(
    function (events) {
      db.query("SELECT * FROM `events` WHERE Name = :Name" , { replacements: {Name:n}, type: QueryTypes.SELECT }).then(
        function (Names) {
          res.render('events',{title: 'AdminEvent', events, Names, Name: true, Natb: true})
        }
      ) 
    }
)})

server.post('/events/EID', (req,res)=>{
  console.log(req.body.EID)
  var id = req.body.EID
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then(
    function (events) {
      db.query("SELECT * FROM `events` WHERE EID = :EID" , {  replacements: {EID:id}, type: QueryTypes.SELECT }).then(
        function (ID) {
          res.render('events',{title: 'AdminEvent', events, ID, EventID: true, IDtb: true})
        }
      ) 
    }
)})

server.post('/events/Costg', (req,res)=>{
  console.log(req.body.Cost)
  var c = req.body.Cost
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then(
    function (events) {
      db.query("SELECT * FROM `events` WHERE Cost > :Cost" , {  replacements: {Cost:c}, type: QueryTypes.SELECT }).then(
        function (g) {
          res.render('events',{title: 'AdminEvent', events, g, Costg: true, gtb: true})
        }
      ) 
    }
)})

server.post('/events/Costl', (req,res)=>{
  console.log(req.body.Cost)
  var c = req.body.Cost
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then(
    function (events) {
      db.query("SELECT * FROM `events` WHERE Cost < :Cost" , {  replacements: {Cost:c}, type: QueryTypes.SELECT }).then(
        function (l) {
          res.render('events',{title: 'AdminEvent', events, l, Costl: true, ltb: true})
        }
      ) 
    }
)})

server.post('/events/Coste', (req,res)=>{
  console.log(req.body.Cost)
  var c = req.body.Cost
  db.query("SELECT * FROM `events`", { type: QueryTypes.SELECT }).then(
    function (events) {
      db.query("SELECT * FROM `events` WHERE Cost = :Cost" , {  replacements: {Cost:c}, type: QueryTypes.SELECT }).then(
        function (e) {
          res.render('events',{title: 'AdminEvent', events, e, Coste: true, etb: true})
        }
      ) 
    }
)})


server.delete('/events/:EID', async (req,res)=>{
  var emp = req.body.EmpID
  db.query("Delete from `events` WHERE EmpID = emp", { type: QueryTypes.SELECT }).then((events)=>{
    res.render('events',{title: 'AdminEvent', events})
  })
})

//--------------------------------------------------------------------------------------------


// For SEATS

server.get('/seats', (_, res)=>{
  // render home
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then( 
    function (seats) {
      res.render('seats',{title: 'AdminSeat', seats})
    }
  )
})

server.post('/seats', (req,res)=>{
  console.log(req.body.cat);
  if(req.body.cat=="Position")
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then( 
    function (seats) {
      res.render('seats',{title: 'AdminSeat', seats, Position: true})
    }
  )

  else if(req.body.cat=="Section Incharge")
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then( 
    function (seats) {
      res.render('seats',{title: 'AdminSeat', seats, Section: true})
    }
  )

  else if(req.body.cat=="Filled")
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then( 
    function (seats) {
      res.render('seats',{title: 'AdminSeat', seats, Filled: true})
    }
  )

})

server.post('/seats/position', (req,res)=>{
  console.log(req.body.position)
  var n = req.body.position
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then(
    function (seats) {
      db.query("SELECT * FROM `seats` WHERE Position = :Position" , { replacements: {Position:n}, type: QueryTypes.SELECT }).then(
        function (Positions) {
          res.render('seats',{title: 'AdminSeat', seats, Positions, Position: true, Ptb: true})
        }
      ) 
    }
)})

server.post('/seats/section', (req,res)=>{
  console.log(req.body.section)
  var e = req.body.section
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then(
    function (seats) {
      db.query("SELECT * FROM `seats` WHERE E_ID = :E_ID" , {  replacements: {E_ID:e}, type: QueryTypes.SELECT }).then(
        function (Sections) {
          res.render('seats',{title: 'AdminSeat', seats, Sections, Section: true, Stb: true})
        }
      ) 
    }
)})

server.post('/seats/filled', (req,res)=>{
  console.log(req.body.filled)
  var f = req.body.filled
  db.query("SELECT * FROM `seats`", { type: QueryTypes.SELECT }).then(
    function (seats) {
      db.query("SELECT * FROM `seats` WHERE Filled = :Filled" , {  replacements: {Filled:f}, type: QueryTypes.SELECT }).then(
        function (Fills) {
          res.render('seats',{title: 'AdminSeat', seats, Fills, Filled: true, Ftb: true})
        }
      ) 
    }
)})

server.delete('/seats/:EID', async (req,res)=>{
  var emp = req.body.EmpID
  db.query("Delete from `seats` WHERE EmpID = emp", { type: QueryTypes.SELECT }).then((seats)=>{
    res.render('seats',{title: 'AdminSeat', seats})
  })
})



//--------------------------------------------------------------------------------------------

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
    if(check.length !== 0 && (req.body.pw == "test" || req.body.pw == "TEST") ) {
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