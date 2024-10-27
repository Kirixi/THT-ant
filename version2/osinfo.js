// app.js
import express from "express";
import os from "os";

const app = express();
const port = 8080;

app.get("/", (req, res) => {
	const osInfo = {
		osType: os.type(),
		platform: os.platform(),
		release: os.release(),
		architecture: os.arch(),
		hostname: os.hostname(),
		cpuCount: os.cpus().length,
		totalMemory: os.totalmem(),
		freeMemory: os.freemem(),
	};

	res.json(osInfo);
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
