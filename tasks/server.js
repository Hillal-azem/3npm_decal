import express from "express";
import taskRouter from "./api/routes/tasks/index.js";

const app = express();

app.use(express.json());

// intercepter toutes les requetes qui commencent par "/users"
app.use("/tasks", taskRouter);

const port = 5000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
