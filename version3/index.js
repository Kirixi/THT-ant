import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 8081;

// MongoDB connection setup
const client = new MongoClient(process.env.DB_URI);

let db;

const connectToDatabase = async () => {
	try {
		await client.connect();
		db = client.db(process.env.DB_NAME);
		console.log("Connected to MongoDB");
	} catch (error) {
		console.error("Error connecting to MongoDB:", error);
	}
};
connectToDatabase();

// Middleware to log access
app.use(async (req, res, next) => {
	const ipAddress = req.ip;

	try {
		await db.collection("access_log").insertOne({
			ip_address: ipAddress,
			access_time: new Date(),
		});
		console.log("Access logged:", ipAddress);
	} catch (error) {
		console.error("Error inserting log:", error);
	}

	next();
});

// Basic route
app.get("/", (req, res) => {
	res.status(200).send("Hello! Your access has been logged.");
});

app.get("/count", async (req, res) => {
	try {
		const count = await db.collection("access_log").countDocuments();
		res.send(`Number of entries in the database: ${count}`);
	} catch (error) {
		console.error("Error fetching count:", error);
		res.status(500).send("Error fetching count");
	}
});

app.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
	console.log(process.env.DB_URI);
});
