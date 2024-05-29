import express from "express";
const app = express();
const PORT = 3000;
app.get("/", async (req, res) => {
	res.send("Hello Express running on bun");
});

app.listen(PORT, () => console.log("Server Running on Port 3000"));
