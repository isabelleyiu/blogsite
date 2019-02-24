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

// add new article
app.post('/articles', db.addArticle);

// get one article by Id
app.get('/articles/:id', db.getArticleById);

// update article by Id
app.put('/articles/:id', db.updateArticle);

// delete article by Id
app.delete('/articles/:id', db.deleteArticle);

app.listen(3000, () => {
  console.log('blog server is running');
});