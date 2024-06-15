import express from "express";
import path from "path";

const route_signin = express.Router();

route_signin.get("/signin", (req, res) => {
	res.sendFile(path.join(__dirname, "../static/signin.html"));
});

export default route_signin;
