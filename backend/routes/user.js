const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const router = express.Router();
const { User, Account } = require("../db.js");
const { authMiddleware } = require("../middlewares/middleware.js");

const signupBody = zod.object({
  username: zod.string().min(3),
  password: zod.string().min(6),
  firstName: zod.string(),
  lastName: zod.string(),
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

const updateBody = zod.object({
  username: zod.string().optional(),
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.post("/signup", async (req, res) => {
  const resu = signupBody.safeParse(req.body);
  if (!resu.success) {
    res.status(411).json({ message: "Email already taken / Incorrect input" });
    return;
  }

  const existingUser = await User.findOne({ username: req.body.username });

  if (existingUser) {
    res.status(411).json({ message: "Email already taken / Incorrect input" });
    return; // this return is important else the code after this will also get executed
  }

  const user = await User.create(req.body);

  const userId = user._id;

  const account = await Account.create({
    balance: 1 + Math.random() * 10000,
    userId: userId,
  });

  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({ message: "User created successfully", token: token });
});

router.post("/signin", async (req, res) => {
  const resu = signinBody.safeParse(req.body);
  if (!resu.success) {
    res.status(411).send({ message: "Error while logging in" });
    return;
  }
  const existingUser = await User.findOne(req.body);

  if (!existingUser) {
    res.status(411).json({ message: "Error while logging in" });
    return; // this return is important else the code after this will also get executed
  }

  const userId = existingUser._id;
  const token = jwt.sign({ userId }, JWT_SECRET);

  res.status(200).json({ token: token });
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);

  if (!success) {
    res.status(411).json({ message: "Incorrect input format" });
    return;
  }

  const updatedUser = await User.findByIdAndUpdate(req.userId, req.body);

  res.status(200).json({ message: "Updated Successfully" });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [{ firstName: filter }, { lastName: filter }],
  });
  // const users = await User.find({
  //   $or: [
  //     {
  //       firstName: {
  //         $regex: filter,
  //       },
  //     },
  //     {
  //       lastName: {
  //         $regex: filter,
  //       },
  //     },
  //   ],
  // });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
