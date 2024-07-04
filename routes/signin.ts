import express from "express";
import path from "path";
import prismadb from "../utils/prismadb_pool";
import { z } from "zod";
import { scrypt_verify } from "../utils/encrypt_scrypt";

const route_signin = express.Router();

const schema_signin = z.object({
	u_name: z
		.string()
		.trim()
		.min(3, "Min Password Length 3 characters")
		.max(8, "Max Password Length 8 characters"),
	u_pwd: z
		.string()
		.min(6, "Min Password Length 6 characters")
		.max(16, "Max Password Length 16 characters"),
});

route_signin.get("/signin", (req, res) => {
	res.sendFile(path.join(__dirname, "../static/signin.html"));
});

route_signin.post("/signin", async (req, res) => {
	const result = schema_signin.safeParse(req.body);
	if (!result.success) res.status(400).send(result.error.issues);
	const data = result.data;
	if (data == undefined) return;

	try {
		const dbres = await prismadb.getClient().user.findFirst({
			where: {
				name: data.u_name,
			},
		});
		if (!dbres) return res.sendStatus(404);

		const verfied = scrypt_verify({
			pwd: data.u_pwd,
			hash: dbres.hash,
			salt: dbres.salt,
		});

		console.log(verfied);
	} catch (error) {
		return res.sendStatus(500);
	}

	return res.sendStatus(200);
});

export default route_signin;
