import mysql from "mysql2/promise";
//connection express to database
export default await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Admin@123#",
  database: "testdb",
});
