const bodyParser = require('body-parser');
const express = require('express');
const helmet = require('helmet');
const path = require('path');


const app = express();
app.use(helmet());
app.use(bodyParser.json());

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app; 