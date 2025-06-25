import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.status(200).send("hello world! this is your first containerized app");
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
