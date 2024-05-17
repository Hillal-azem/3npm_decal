import express from "express";
import { body, query, validationResult } from "express-validator";
import {
  listAllTaks,
  addTask,
  removeTask,
} from "../../services/tasks/index.js";

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

const validateDelete = [query("taskId").notEmpty().isString()];

router.delete("/", validateDelete, (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      errors: errors.array(),
    });
  }

  try {
    const taskId = parseInt(req.query.taskId);

    removeTask(taskId)
      .then((message) => {
        // je suis dans le cas où la suppression s'est bien passée

        if (message === "not found") {
          return res.status(400).json({
            message: "task not found",
          });
        }

        res.status(200).json({
          message: "Task deleted successfully!",
        });
      })
      .catch(() => {
        res.status(500).json({
          msg: "Error server",
        });
      });
  } catch (error) {
    console.log("error", error);
    return res.status(400).json({
      message: "taskId should be able to be parsed to integer",
    });
  }
});

export default router;
