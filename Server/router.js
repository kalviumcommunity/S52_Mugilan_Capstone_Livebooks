import express from "express";
import UserModel from "./models/user.js";
import ErrorHandler from "./middlewar/ErrorHandler.js";
import { CatchAsyncError } from "./middlewar/catchAsynErrors.js";
import jwt from "jsonwebtoken";
import ejs from "ejs";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const isEmailExist = await UserModel.findOne({ email });
    if (isEmailExist) {
      return res.status(400).send("Email Already Exist");
    }
    const user = {
      name,
      email,
      password,
    };


    const newUser = new UserModel(user);
    newUser.save()
    return res.status(200).json(newUser);

    // const activationKey = createActivationToken(user);

    // const activationCode = activationKey.activationCode

    // const data = {user : {name:user.name}, activationCode}
    // const html = await ejs.renderFile(path.join(__dirname, "./mails/activation-mail.ejs"), data)
  } catch (error) {
    return next(new (ErrorHandler(error.message, 400))());
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }
  if (password !== user.password) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  return res.status(200).json({ message: "Login done" });
});

// export const createActivationToken = (user) => {
//   const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

//   const token = jwt.sign(
//     {
//       user,
//       activationCode,
//     },
//     process.env.ACTIVATION_SECRET,
//     {
//       expiresIn: "7d",
//     }
//   );

//   return { token, activationCode };
// };

export default router;
