const Sequelize = require('sequelize')

require('dotenv').config()

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  operatorAAliases: false
});

module.exports = db;
// global.db = db;

/*var con = mysql.createConnection({
  host: "database-sarim-lab.cwitnryywnwa.ap-south-1.rds.amazonaws.com",
  user: "root",
  password: "rootroot",
  database : "temp"
})

const _interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


con.connect(function(err) {
  if (err) throw err
  console.log("Connected!")
    _interface.close()
   })   
})
*/



