const express = require("express");
const db = require("./users_models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const secrets = require("../config/secrets");

const restrict = require("../middleware/restrict");
/*  USER ROUTER  */
const userRouter = express.Router();

//-----------------------------------------------------------------------------
//  GETs all user accounts. (You must be logged in with creator role)
// /api/users/getusers
//-----------------------------------------------------------------------------
userRouter.get("/", restrict("creator"), async (req, res, next) => {
  try {
    const users = await db.allUsers();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//-----------------------------------------------------------------------------
// POST registers new user and return users info
// /api/users/register
//-----------------------------------------------------------------------------
userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, role } = req.body;
    const user = await db.findUser({ username }).first();

    if (user) {
      return res.status(400).json({
        Message: "Username is already being used. Please try another",
      });
    }
    const newUser = await db.addUser({
      username,
      password: await bcrypt.hash(password, 12),
      role,
    });
    return res.status(201).json({
      Message: " User was created successfully!",
      newUser,
      // access_token: token

    });
  } catch (err) {
    next(err);
  }
});

//-----------------------------------------------------------------------------
// POST Logs in user and Returns a welcome message with username gives a token
// /api/users/login
//-----------------------------------------------------------------------------
userRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await db.findUser({ username }).first();

    if (!user) {
      return res.status(401).json({
        Error: "You have entered an incorrect username",
      });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({
        Error: "You have entered an incorrect password",
      });
    }
    console.log(user);

    /*  generate token  */
    const token = jwt.sign(
      {
        userID: user.id,
        username: user.username,
        userRole: user.role,
      },
      process.env.JWT_Secret
    );

    res.cookie("token", token);
    res.status(200).json({
      Message: `Welcome ${user.username}!`,
      token,
    });
  } catch (err) {
    next(err);
  }
});

//-----------------------------------------------------------------------------
// PUT updates user   /api/users/update/:id
//-----------------------------------------------------------------------------
userRouter.put("/:id", restrict("creator"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const changes = req.body;
    const user = db.findById(id);

    if (user) {
      db.updateUser(changes, id).then((updatedUser) => {
        res.json({
          Success: updatedUser + " User has been updated successfully.",
        });
      });
    } else {
      res.status(404).json({
        Error: "Could not find User with given id. please try another user id",
      });
    }
  } catch (err) {
    next(err);
  }
});

//-----------------------------------------------------------------------------
// DELETE   user   /api/users/delete/:id
//-----------------------------------------------------------------------------
userRouter.delete("/:id", restrict("creator"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteduser = db.removeUser(id);

    if (deleteduser) {
      res.json({
        Deleted: " User has been successfully deleted.",
      });
    } else {
      res.status(404).json({
        Error: "Could not find User with given id. Please try another User id.",
      });
    }
  } catch (err) {
    next(err);
  }
});

//-----------------------------------------------------------------------------
module.exports = userRouter;
