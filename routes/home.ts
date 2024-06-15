import express from "express";
import path from "path";

const route_home = express.Router();

route_home.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../static/home.html"));
});

export default route_home;
