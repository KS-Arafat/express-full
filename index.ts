import express from "express";
import cors from "cors";
import route_home from "./routes/home";
import route_signin from "./routes/signin";

import type { CorsOptions } from "cors";
import route_signup from "./routes/signup";

const app = express();
const PORT = 3000;

const corsOption: CorsOptions = {
	methods: ["get", "post"],
	origin: ["http://localhost:3000"],
	credentials: true,
	preflightContinue: false,
	optionsSuccessStatus: 204,
};

app.use(cors(corsOption));

app.use("/", route_home);
app.use("/", route_signin);
app.use("/", route_signup);

app.listen(PORT, () => console.log("Server Running on Port 3000"));
