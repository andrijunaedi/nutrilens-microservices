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
  db.run(`CREATE TABLE IF NOT EXISTS consumptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    quantity REAL NOT NULL
  )`);
});

module.exports = {
  createConsumption(user_id, product_id, date, quantity) {
    return new Promise((resolve, reject) => {
      const query =
        'INSERT INTO consumptions (user_id, product_id, date, quantity) VALUES (?, ?, ?, ?)';
      db.run(query, [user_id, product_id, date, quantity], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, user_id, product_id, date, quantity });
      });
    });
  },

  getConsumptionById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM consumptions WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  updateConsumption(id, user_id, product_id, date, quantity) {
    return new Promise((resolve, reject) => {
      const query =
        'UPDATE consumptions SET user_id = ?, product_id = ?, date = ?, quantity = ? WHERE id = ?';
      db.run(query, [user_id, product_id, date, quantity, id], function (err) {
        if (err) return reject(err);
        resolve({ id, user_id, product_id, date, quantity });
      });
    });
  },

  deleteConsumption(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM consumptions WHERE id = ?';
      db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve({ id });
      });
    });
  },

  getAllConsumptions() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM consumptions';
      db.all(query, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getConsumptionsByUserId(user_id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM consumptions WHERE user_id = ?';
      db.all(query, [user_id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },

  getConsumptionsByProductId(product_id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM consumptions WHERE product_id = ?';
      db.all(query, [product_id], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
};
