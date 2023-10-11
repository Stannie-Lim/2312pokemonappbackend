const express = require("express");
const axios = require("axios");

const app = express();

// need these two lines to enable cors to be able to take requests from ANY domain including http://localhost:5173/
const cors = require("cors");
app.use(cors());

// this is our server (kitchen)
// it has to listen to requests from a waiter
// an event listener

// our first express route
/*
CRUD - Create Read Update Delete
Create - POST
app.post("/", (req, res) => {

Read - GET
app.get("/", (req, res) => {

Update - PUT/PATCH
app.put("/", (req, res) => {
app.patch("/", (req, res) => {

Delete - DELETE
app.delete("/", (req, res) => {
*/
app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");

    const pokemon = response.data.results;

    res.send(pokemon);
  } catch (error) {
    console.log(error, "this is the error");
  }
});

app.get("/:name", async (req, res) => {
  const name = req.params.name;

  const response = await axios.get(`
  https://pokeapi.co/api/v2/pokemon/${name}
  `);

  const pokemon = response.data;
  res.send(pokemon);
});

app.get("/abilities/:name", async (req, res) => {
  const name = req.params.name;

  const response = await axios.get(`
  https://pokeapi.co/api/v2/pokemon/${name}
  `);
  res.send(response.data.abilities);
});

app.listen(3000);
