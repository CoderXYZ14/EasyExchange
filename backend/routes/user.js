const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { User } = require("../db");
const router = express.Router();
const { JWT_SECRET } = require("../config");
const { authMidlleware } = require("../middleware");

//signup
const signupSchema = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Email already taken / Incorrwct input",
    });
  }
  const existingUser = await User.findOne({
    username: body.username,
  });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken / Incorrwct input",
    });
  }
  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
  res.json({
    message: "User created successfully",
    token: token,
  });
});

//signin
const signinSchema = zod.object({
  username: zod.string().email,
  password: zod.string(),
});
router.post("/signin", async (req, res) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrwct input",
    });
  }
  const dbUser = await User.findOne({
    username: body.username,
    password: body.username,
  });
  if (dbUser) {
    const token = jwt.sign(
      {
        userId: dbUser._id,
      },
      JWT_SECRET
    );
    res.json({
      token: token,
    });
    return;
  }
  res.status(411).json({
    message: "Error while loggin in",
  });
});

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});
router.put("/", authMidlleware, async (req, res) => {
  const body = req.body;
  const { success } = updateSchema.safeParse(body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating info",
    });
  }
  await User.updateOne(
    {
      _id: req.userId,
    },
    body
  );
  res.json({
    message: "Updated successfully",
  });
});
module.exports = router;
