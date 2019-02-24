const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
});

const getArticles = (req, res) => {
  pool.query('SELECT * FROM articles ORDER BY id ASC', (err, results) => {
    if(err) {
      throw err;
    } 
    res.status(200).json(results.rows);
  });
}

const getArticleById = (req, res) => {
  const id = req.params.id;
  pool.query('SELECT * FROM articles WHERE id=$1', [id], (err, results) => {
    if(err) {
      throw err;
    }
    res.status(200).json(results.rows);
  }); 
}

const addArticle = (req, res) => {
  const { title, author, content } = req.body;
  pool.query('INSERT INTO articles (title, author, content) VALUES($1, $2, $3)', [title, author, content], (err, results) => {
    if(err) {
      throw err;
    }
    res.status(201).send(`Article added with id: ${results.insertId}`);
  });
}

const updateArticle = (req, res) => {
  const id = req.params.id;
  const { title, author, content } = req.body;
  pool.query('UPDATE articles SET title = $1, author = $2, content = $3 WHERE id = $4',
   [title, author, content, id],
    (err, results) => {
    if(err) {
      throw err;
    } 
    res.status(200).send(`Article is updated with ID: ${id}`);
  });
}

const deleteArticle = (req, res) => {
  const id = req.params.id;
  pool.query('DELETE FROM articles WHERE id = $1', [id], (err, results) => {
    if(err) {
      throw err;
    } 
    res.status(200).send(`Article deleted with ID: ${id}`);
  });
}

module.exports = {
  getArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle
};