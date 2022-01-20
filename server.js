const express = require("express");
const path = require("path");
const app = express();
const database = require("./Develop/db/db.json");
const fs = require("fs");
// Helper method for generating unique ids
const uuid = require("./helpers/uuid");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("Develop/public"));

//GET home (index.html)
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "./develop/public/index.html"));
});
//GET notes.html
app.get("/notes", (req, res) => {
	res.sendFile(path.join(__dirname, "./develop/public/notes.html"));
});

//GET data from db.json
app.get("/api/notes", (req, res) => res.json(database));

//POST request to add a review
app.post("/api/notes", (req, res) => {
	// Log that a POST request was received
	console.info(`${req.method} request received to add a review`);
	// Destructuring assignment for the items in req.body
	const { title, text } = req.body;
	// If all the required properties are present
	if ((title, text)) {
		// Variable for the object we will save
		const newNotes = {
			title,
			text,
			note_id: uuid(),
		};
		// Convert the data to a string so we can save it
		const noteString = JSON.stringify(newNotes);
		// Write the string to a file
		fs.writeFile(`Develop/db/db.json`, noteString, (err) =>
			err
				? console.error(err)
				: console.log(
						`Notes for ${newNotes.product} has been written to JSON file`
				  )
		);
		const response = {
			status: "success",
			body: newNotes,
		};
		console.log(response);
		res.status(201).json(response);
	} else {
		res.status(500).json("Error in posting Notes");
	}
});

app.listen(3001, () => console.log("Express Server on port 3000!"));
