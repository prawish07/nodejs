import express, { json } from "express";
import userRouter from "../day8/routes/userRoute.js";

const app = express();
app.use(express.json());
app.use("/", userRouter);
app.listen(8000, async () => {
  console.log("Server has started from Prepaid statement");
});
