import chalk from "chalk";
import fs from "fs";
import { resolve } from "path";

function addTask(task) {
  // ajoute à la fin du tableau du fichier tasks.json la tâche reçue en paramètre

  listAllTaks()
    .then((tasks) => {
      tasks.push(task);

      fs.writeFile("tasks.json", JSON.stringify(tasks), () => {
        console.log("opération terminé !");
      });
    })
    .catch((error) => {
      console.log("une erreur s'est produite");
    });
}

function listAllTaks() {
  // Récupérer toutes les tâches qui sont dans le fichier tasks.json
  // je dois lire le fichier et récupérer son contenu
  // afficher toutes les tâches

  return new Promise((resolve, reject) => {
    fs.readFile("tasks.json", "utf-8", (error, data) => {
      if (error) {
        console.log("Un erreur a survenu");
        reject(error);
      } else {
        console.log("data: ", data);
        resolve(JSON.parse(data));
      }
    });
  });

  //
}

function removeTask(taskId) {
  return new Promise(async (resolve, reject) => {
    try {
      const tasks = await listAllTaks();
      const restTask = tasks.filter((task) => {
        return task.id !== taskId;
      });
      console.log(restTask.length);
      fs.writeFile("tasks.json", JSON.stringify(restTask), () => {
        resolve("sucess");
      });
    } catch {
      reject();
    }
  });
}

export { addTask, listAllTaks, removeTask };
