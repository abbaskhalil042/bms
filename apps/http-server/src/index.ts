import express from "express";
import { prisma } from "@repo/db/prisma";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//*signup
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ error: "username and password are required" });
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
