require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const db = require('./models');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


app.get('/', (req, res) => {
  res.send('Welcome to my blogsite!');
});

// // display all articels
app.get('/articles', (req, res) => {
  db.Article.findAll().then(articles => res.json(articles));
});

// add new article
app.post('/articles', (req, res) => {
  db.Article.create({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  }).then(result => res.json(result));
});

// get one article by Id
app.get('/articles/:id', (req, res) => {
  db.Article.findById(req.params.id).then(result => res.json(result));
});

// // update article by Id
app.put('/articles/:id', (req, res) => {
  db.Article.update({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content
  },
  {
    where: {
      id: req.params.id
    }
  }).then(result => res.json(result));
});

// // delete article by Id
app.delete('/articles/:id', (req, res) => {
  db.Article.destroy({
    where: {
      id: req.params.id
    }
  }).then(result => res.json(result));
});


db.sequelize.sync().then(()=> {
  app.listen(3000, () => {
    console.log('blog server is running');
  });
});
