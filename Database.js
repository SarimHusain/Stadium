
var con = mysql.createConnection({
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



