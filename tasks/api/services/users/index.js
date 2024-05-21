import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../../models/user/index.js";

function addUser(email, password) {
  return new Promise((resolve, reject) => {
    // instancier mon model utilisateur
    const newUser = new User({
      email,
      password,
    });

    // sauvegarder l'utilisateur dans la base de données
    newUser
      .save()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export { addUser };
