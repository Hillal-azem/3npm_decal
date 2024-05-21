import express from "express";
import { addUser } from "../../services/users/index.js";
import { hashPassword, generateJwt } from "../../services/shared/index.js";
import isAuthenticated from "../../../middlewares/isAuthenticated/index.js";

const router = express.Router();

// vous devez rajouter la validation des données
router.post("/", async (req, res) => {
  //appel à mon service qui permet d'ajouter un nouvel utilisateur

  const { email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);
    const user = await addUser(email, hashedPassword);

    // générer et signer un jwt

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const token = await generateJwt(payload);

    res.cookie("auth-token", token, { httpOnly: true });

    return res.status(201).json({
      message: "User created",
      user: { email: user.email, _id: user._id },
    });
  } catch (error) {
    return res.status(500).json({ message: "An error occurred" });
  }
});

// j'ai une route qui permet de supprimer un utilisateur
router.delete("/", isAuthenticated, (req, res) => {});

export default router;
