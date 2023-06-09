const express = require("express");
let db = require("./db/db.json");

// define port
const port = process.env.PORT ||  3001;

// start app
const app = express();

// middleware
app.use(express.static(__dirname + "/public"));// defining static files follder
app.use(express.json()); // allows us to recieve json data from frontend

// get all notes route
app.get("/api/notes", (req, res) => {
  res.json(db);
});

// create a new note route
app.post("/api/notes", (req, res) => {
  const newNote = req.body; // req.body = {tittle:"", text:""} ["sample", "title"]
  newNote.id =
    db.length + 1 + Math.random() * 100 + newNote.title.split(" ").join(""); // generate a unique id
  db.push(newNote);
  res.json({ message: "created note successfully", data: db });
});

// delete a note route, :îd means id is a route parameter
app.delete("/api/notes/:id", (req, res) => {
  // /api/notes/dlaklk3094k
  const id = req.params.id;

  const newDB = db.filter((n) => n.id != id); // (==, !=) compare only value, (===, !==) compare both value and type
  db = newDB;

  res.json({ message: "deleted note successfully!", data: newDB });
});

app.get("/notes", (req, res) => {
  res.sendFile(__dirname + "/public/notes.html"); //directoryname/public/notes.html
});
app.get("*", (req, res) => {
  res.sendFile(__dirname + "/public/index.html"); //directoryname/public/notes.html
});

app.listen(port, () => console.log(`server started at PORT: ${port}`));
