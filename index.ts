import express from "express";
import path from "path";

const app = express();
const PORT = 3000;
const rootPath = __dirname;

// app.use("/", express.static(path.join(rootPath, "static/home.html")));

app.get("/", (req, res) => {
	res.sendFile(path.join(rootPath, "static/home.html"));
});

app.get("/signin", (req, res) => {
	res.sendFile(path.join(rootPath, "static/signin.html"));
});

app.get("/signup", (req, res) => {
	res.sendFile(path.join(rootPath, "static/signup.html"));
});

app.listen(PORT, () => console.log("Server Running on Port 3000"));
