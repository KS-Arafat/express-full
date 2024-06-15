import express from "express";
import path from "path";

const route_signup = express.Router();

route_signup.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, "../static/signup.html"));
});

export default route_signup;
