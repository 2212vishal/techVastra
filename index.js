const express = require("express");
const app = express();
const sharp = require('sharp')
const fs = require("fs");



const {cloudinaryConnect} = require('./config/cloudinary')
const fileUpload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

const database = require("./config/database");
// Connecting to database
database.connect();

cloudinaryConnect();

// Middlewares
app.use(express.json());


const createRoute = require('./route/createRoute')

app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: "/tmp/",
	})
);

app.use('/api/v1',createRoute)

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`App is listening at ${PORT}`);
});

// End of code.
