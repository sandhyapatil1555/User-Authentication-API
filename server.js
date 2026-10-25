
const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("User Authentication API is running!");
});


 // Signup API
app.post("/signup", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, email and password."
    });
  }

  try {
    const fileData = fs.readFileSync("users.json", "utf8");
    const users = JSON.parse(fileData);

    const existingUser = users.find(
      user => user.email === email
    );

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered."
      });
    }

    const hashedPassword = require("bcryptjs").hashSync(password, 10);

    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: hashedPassword
    };

    users.push(newUser);

    fs.writeFileSync(
      "users.json",
      JSON.stringify(users, null, 2)
    );

    res.status(201).json({
      success: true,
      message: "Signup successful!",
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while signing up."
    });
  }
});


 // Login API
console.log("LOGIN ROUTE REGISTERING");
app.get("/check-login", (req, res) => {
  res.send("Login route area reached");
});
 app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide email and password."
    });
  }

  try {
    const users = JSON.parse(
      fs.readFileSync("users.json", "utf8")
    );

    const user = users.find(
      user => user.email === email
    );

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    const isPasswordCorrect =
      require("bcryptjs").compareSync(
        password,
        user.password
      );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong while logging in."
    });
  }
});
console.log("LOGIN ROUTE LOADED");
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
