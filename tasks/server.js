import express from "express";
import { connect } from "mongoose";
import taskRouter from "./api/routes/tasks/index.js";
import userRouter from "./api/routes/users/index.js";

const app = express();

app.use(express.json());

// intercepter toutes les requetes qui commencent par "/users"
app.use("/tasks", taskRouter);

app.use("/users", userRouter);

connect("mongodb://localhost:27017/tasks")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((error) => {
    console.log("error", error);
  });

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
