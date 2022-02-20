/* 
MongoDB Connection Authentication details:
Username: prasanna
Password: XoBMXHSfEJg7iGUc
*/

/*
In the password field we inserted the password from the above created user. For the database name,
we replaced myFirstDatabase string with tinderdb and that will create a database with name tinderdb.
Enter this Connection string in the terminal to connect the app to MongoDB: 
mongodb+srv://prasanna:<XoBMXHSfEJg7iGUc>@cluster0.67vqg.mongodb.net/tinderdb?retryWrites=true&w=majority
*/

/* 
CommonJS module system is used for NodeJS apps but we set up "type": "module" 
in out package.json file that enables us to use normal import 
statements system in node. So we use that in this project.
const express = require("express");
const mongoose = require("mongoose"); 
*/

import express from "express";
import mongoose from "mongoose";
import Cors from "cors";
import Cards from "./dbCards.js";

// App Config
const app = express();
const port = process.env.PORT || 8000;
const password = "XoBMXHSfEJg7iGUc";
const connection_url = `mongodb+srv://prasanna:${password}@cluster0.67vqg.mongodb.net/tinderdb?retryWrites=true&w=majority`;

// Middlewares
app.use(express.json());
app.use(Cors());

// DB Config
mongoose
  .connect(connection_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connection successful"));

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Helllo clever programmers!"));

// Card data is pushed or posted to the database using POST request
app.post("/tinder/cards", (req, res) => {
  const dbCard = req.body;
  Cards.create(dbCard, (err, data) => {
    if (!err) {
      res.status(201).send(data);
      // console.log(data);
    } else {
      res.status(500).send(err);
      // console.log(err);
    }
  });
});

app.get("/tinder/cards", (req, res) => {
  Cards.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listeners
app.listen(port, () => console.log(`Listening on localhost: ${port}`));

// Heroku url for the database:
// https://tinder-pk-back.herokuapp.com/
