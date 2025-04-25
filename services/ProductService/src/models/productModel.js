const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.resolve(__dirname, '../db');
const dbPath = path.join(dbDir, 'database.sqlite');

// Ensure the database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir);
}

const db = new sqlite3.Database(dbPath);

// Initialize table
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL
  )`);
});

module.exports = {
  createProduct(name, price) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO products (name, price) VALUES (?, ?)';
      db.run(query, [name, price], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, name, price });
      });
    });
  },

  getProductById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  updateProduct(id, name, price) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE products SET name = ?, price = ? WHERE id = ?';
      db.run(query, [name, price, id], function (err) {
        if (err) return reject(err);
        resolve({ id, name, price });
      });
    });
  },

  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM products WHERE id = ?';
      db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve({ id });
      });
    });
  },

  getAllProducts() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM products';
      db.all(query, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
};
