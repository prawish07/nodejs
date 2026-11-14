import express from "express";
import connection from "../config/connection.js";
const router = express.Router();

//insert user data to DB-create
router.post("/user/add", async (req, res) => {
  const { username, location } = req.body;
  try {
    const [rows, fields] = await connection.query(
      `INSERT INTO users(username,location) VALUES(?,?)`,
      [username, location],
    );
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
  }
});

//read the data from database
router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    connection.query(
      `SELECT * FROM users WHERE id=?`,
      [id],
      (err, results, fields) => {
        console.log(results);
        res.status(200).json(...results);
      },
    );
  } else
    res.status(408).json({ success: false, message: "User id not provided" });
});

//update the users
router.put("/user/update/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    const { username, location } = req.body;
    connection.query(
      `UPDATE users SET username=?, location=? WHERE id=?`,
      [username, location, id],
      (err, results, fields) => {
        console.log(results);
        if (results.affectedRows === 1) {
          res.status(200).json({ success: true, message: "Updated" });
        } else res.status(200).json({ success: false, message: "not Updated" });
      },
    );
  } else res.status(408).json({ success: false, message: "User not updated" });
});

//to delete the user
router.delete("/user/delete/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    connection.query(
      `DELETE FROM users WHERE id=?`,
      [id],
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

export default router;
