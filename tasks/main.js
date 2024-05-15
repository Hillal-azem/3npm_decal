import { addTask, listAllTaks, removeTask } from "./tasks.js";

// je reçois une requête http get
// elle me demande la liste de toutes les tâches

/* listAllTaks()
  .then((data) => {
    // opérations
    console.log(data);
    // répondre à la requete avec toutes les tâches
  })
  .catch((error) => {
    console.log(error);
  }); */

const newTask = {
  id: 1234567,
  title: "do something",
  completed: false,
  createdBy: "Dexter",
};

// addTask(newTask);

removeTask(123456)
  .then(() => {
    console.log("success");
  })
  .catch((error) => {
    console.log("error !!!");
  });
