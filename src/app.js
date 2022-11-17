const express = require("express");

const port = 3000;

const app = express();
app.use(express.json());

app.use('/empresa', require('./routes/empresa'));
app.use('/usuario', require('./routes/usuario'));
app.use('/categoria', require('./routes/categoria'));
app.use('/subcategoria', require('./routes/subcategoria'));

const database = require('./db/database');
database.startConnection();

app.get("/", async (req, res) => {
    res.status(200).json({message: "Ola, Mundo NodeJS"});
});

const server = app.listen(port, () => {
    console.log(`Projeto api express ${port}`);
});

module.exports = server;