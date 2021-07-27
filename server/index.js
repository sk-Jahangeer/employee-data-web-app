require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const connection = require("./db");
const employees = require("./routes/employees");

// database
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/employees", employees);

// serve static files
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "build", "index.html"));
});

// listening on port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
