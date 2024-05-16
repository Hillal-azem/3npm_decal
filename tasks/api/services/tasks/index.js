import fs from "fs";
import path, { resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function addTask(task) {
  // ajoute à la fin du tableau du fichier tasks.json la tâche reçue en paramètre
  return new Promise((resolve, reject) => {
    listAllTaks()
      .then((tasks) => {
        tasks.push(task);

        fs.writeFile(
          path.resolve(__dirname, "./tasks.json"),
          JSON.stringify(tasks),
          () => {
            resolve();
          }
        );
      })
      .catch((error) => {
        reject();
      });
  });
}

function listAllTaks() {
  // Récupérer toutes les tâches qui sont dans le fichier tasks.json
  // je dois lire le fichier et récupérer son contenu
  // afficher toutes les tâches

  return new Promise((resolve, reject) => {
    fs.readFile(
      path.resolve(__dirname, "./tasks.json"),
      "utf-8",
      (error, data) => {
        if (error) {
          console.log("Un erreur a survenu");
          reject(error);
        } else {
          console.log("data: ", data);
          resolve(JSON.parse(data));
        }
      }
    );
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
