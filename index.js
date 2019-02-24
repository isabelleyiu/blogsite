require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./queries');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send('Welcome to my blogsite!');
});

// display all articels
app.get('/articles', db.getArticles);

// get one article by Id
app.get('/articles/:id', db.getArticleById);

// add new article
app.post('/articles', db.addArticle);

app.listen(3000, () => {
  console.log('blog server is running');
});