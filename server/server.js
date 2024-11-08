import express from "express";

import User from "../server/models/user.js";
import connectDB from "./DB/mongoose.js";
import jwt, { decode } from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "'http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const secretKey = "IDONTKNOW";

connectDB()
  .then(() => {
    const PORT = 8080;
    app.listen(PORT, () => {
      console.log(`App is up on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const tokenMiddleware = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(403).send("No token found");
  }
  const token = tokenHeader.split(" ")[1];
  jwt.verify(token, secretKey, (err, decode) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }
    req.userData = decode;
    next();
  });
};

const adminMiddleware = (req, res, next) => {
  const { role } = req.userData;
  if (role !== "Admin") {
    return res.send("Access Denied");
  }

  next();
};

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({
      name,
      email,
      password: hashedPassword,
      role: role || "User", //when role is not provided, user will be assigned
    });
    await user.save();
    return res.json({ Status: "Success" });
  } catch (error) {
    res.send(error);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    console.log("password: ", password);
    console.log("user.password: ", user.password);
    console.log("matchPassword: ", matchPassword);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const { role } = user;
    const token = jwt.sign({ email, role }, secretKey);
    res.json({
      token,
      message: "Success",
      userInfo: { name: user.name, email: user.email, role: role },
    });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
app.get("/personalInfo", tokenMiddleware, async (req, res) => {
  const userInformation = req.userData;
  const { email } = userInformation;
  const currentUser = await User.findOne({ email });

  res.send({ currentUser });
});

app.get("/getUsers", tokenMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);

    res.send("Something went wrong");
  }
});

app.delete("/users/:id", tokenMiddleware, adminMiddleware, async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.send("User deleted successdully");
});
