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

module.exports = {
  getArticles,
  getArticleById
};