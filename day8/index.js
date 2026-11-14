import express, { json } from "express";
import mysql from "mysql2";
const app = express();
let connection;
app.use(express.json());
//insert user data to DB-create
app.post("/user/add", (req, res) => {
  const { username, location } = req.body;
  connection.query(
    `INSERT INTO users(username,location) VALUES('${username}','${location}')`,
    (err, results, fields) => {
      if (err) throw err;
      console.log(results);
      if (results.affectedRows == 1) {
        res.status(200).json({ success: true, message: "User added to DB" });
      } else
        res
          .status(408)
          .json({ success: false, message: "User not added to DB" });
    },
  );
});

//read the data from database
app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    connection.query(
      `SELECT * FROM users WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        res.status(200).json(...results);
      },
    );
  } else
    res.status(408).json({ success: false, message: "User id not provided" });
});

//update the users
app.put("/user/update/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    const { username, location } = req.body;
    connection.query(
      `UPDATE users SET username='${username}', location='${location}' WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows === 1) {
          res.status(200).json({ success: true, message: "Updated" });
        }
         else res.status(200).json({ success: false, message: "not Updated" });
      },
    );
  } else res.status(408).json({ success: false, message: "User not updated" });
});

//to delete the user
app.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    connection.query(
      `DELETE FROM users WHERE id=${id}`,
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows === 1) {
          res.status(200).json({ success: true, message: "User deleted" });
        } else
          res.status(408).json({ success: false, message: "User not deleted" });
      },
    );
  } else res.status(408).json({ success: false, message: "Not deleted" });
});
app.listen(8000, () => {
  console.log("Server has started");
  //connection express to database
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Admin@123#",
    database: "testdb",
  });
});
