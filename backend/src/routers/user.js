const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");
const multer = require("multer");
const { Error } = require("mongoose");
const sharp = require("sharp");
const email = require("../emails/account");

router.post("/users", async (req, res) => {
  //addUser
  const user = new User(req.body);
  try {
    await user.save();
    //email.sendWelcomeEmail(user.email,user.name)
    const token = await user.generateAuthToken(
      { _id: user._id },
      "dorbirendorf"
    );
    res.status(200).send({ user, token });
    console.log(`${user.email} has registered`);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  //get my profile
  res.send(req.user);
});

router.post("/users/logout", auth, async (req, res) => {
  //logout from this device
  try {
    req.user.tokens = req.user.tokens.filter((t) => {
      return t.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/users/logoutall", auth, async (req, res) => {
  //logout from all
  try {
    const user = req.user;
    user.tokens = [];
    await user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  //edit my profile
  const allowed = ["name", "email", "password", "age"];
  const updates = Object.keys(req.body);
  const isValidOpration = updates.every((update) => allowed.includes(update));

  if (!isValidOpration) {
    return res.status(404).send("error:invalid updates!");
  }

  try {
    const user = req.user;
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

router.post("/users/login", async (req, res) => {
  //login (get new token for device)
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
    console.log(`${user.name} has logged in `);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/me", auth, async (req, res) => {
  //delete my profile
  try {
    await req.user.remove();
    email.sendGoodbyeEmail(req.user.email, req.user.name);
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jepg|png)$/)) {
      cb(new Error("please upload picture file!"));
    }
    cb(undefined, true);
  },
});

router.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    //add profile pic
    const buffer = await sharp(req.file.buffer)
      .resize({ height: 250, width: 250 })
      .jpeg()
      .toBuffer();
    req.user.avatar = buffer;
    await req.user.save();
    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

router.delete("/users/me/avatar", auth, async (req, res) => {
  //delete my profile pic
  try {
    req.user.avatar = undefined;
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user | !user.avatar) {
      throw new Error();
    }
    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send;
  }
});

router.get("/users/me/avatar", auth, async (req, res) => {
  try {
    const user = req.user;
    if (!user | !user.avatar) {
      throw new Error();
    }
    res.set("Content-type", "image/png");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send;
  }
});

router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(404).send;
  }
});

module.exports = router;
