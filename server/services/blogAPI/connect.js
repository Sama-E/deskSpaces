import mysql from "mysql";

export const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"root",
  database: "deskspace",
  port: "3306"
})

//Check connection
db.connect((err) => {
  if(err){
    throw err
  } else {
    console.log("connected")
  }
})

const port = 3306;

console.log("App is listening on port " + port)