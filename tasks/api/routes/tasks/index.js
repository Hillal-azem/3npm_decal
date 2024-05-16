import express from "express";
import { body, validationResult } from "express-validator";
import { listAllTaks, addTask } from "../../services/tasks/index.js";

const router = express.Router();

router.get("/", (req, res) => {
  // je dois aller chercher toutes les tâches qui se trouve dans le
  // fichier tasks.json
  // je peux faire appel à la fonction listAllTasks pour récupérer toutes les tahces

  listAllTaks()
    .then((tasks) => {
      res.status(200).json({
        tasks,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "une erreur à survenue",
      });
    });
});

const validationRules = [
  body("id")
    .notEmpty()
    .isInt()
    .trim()
    .escape()
    .withMessage("id is required and should be an integer"),
];

router.post("/", validationRules, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
  }

  const task = req.body;

  addTask(task)
    .then(() => {
      res.json({
        message: "Task added successfully!",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "An error has occurred!",
      });
    });
});

export default router;
