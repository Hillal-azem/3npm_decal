import brypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";

const privateKey = fs.readFileSync("private.key");
const publicKey = fs.readFileSync("public.key");

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    brypt.genSalt(10, (error, salt) => {
      if (error) {
        reject(error);
      } else {
        brypt.hash(password, salt, (error, hash) => {
          if (error) {
            reject(error);
          } else {
            resolve(hash);
          }
        });
      }
    });
  });
}

function generateJwt(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, privateKey, { algorithm: "RS256" }, (error, token) => {
      if (error) {
        reject(error);
      } else {
        resolve(token);
      }
    });
  });
}

export { hashPassword, generateJwt };
