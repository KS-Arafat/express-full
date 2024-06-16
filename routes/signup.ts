import express from "express";
import path from "path";
import { z } from "zod";
import { scrypt_generation } from "../utils/encrypt_scrypt";
import prismadb from "../utils/prismadb_pool";

const route_signup = express.Router();

const schema_signup = z.object({
	u_name: z
		.string()
		.trim()
		.min(3, "Min Password Length 3 characters")
		.max(8, "Max Password Length 8 characters"),
	u_mail: z
		.string()
		.trim()
		.email("Email is not Valid")
		.max(30, "Max Password Length 30 characters"),
	u_pwd: z
		.string()
		.min(6, "Min Password Length 6 characters")
		.max(16, "Max Password Length 16 characters"),
});

route_signup.get("/signup", (req, res) => {
	res.sendFile(path.join(__dirname, "../static/signup.html"));
});

route_signup.post("/signup", async (req, res) => {
	// console.log(req.body);
	const result = schema_signup.safeParse(req.body);
	if (!result.success) res.status(400).send(result.error.issues);
	const data = result.data;
	if (data == undefined) {
		res.sendStatus(400);
		return;
	}
	const { salt, hash } = scrypt_generation(data.u_pwd);

	try {
		await prismadb.getClient().user.create({
			data: {
				name: data.u_name,
				email: data.u_mail,
				hash: hash,
				salt: salt,
			},
		});
	} catch (err) {
		res.status(400).redirect("/signup");
	}

	res.status(200).redirect("/signin");
});

export default route_signup;
