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
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);
});

module.exports = {
  createUser(name, email) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (name, email) VALUES (?, ?)';
      db.run(query, [name, email], function (err) {
        if (err) return reject(err);
        resolve({ id: this.lastID, name, email });
      });
    });
  },

  getUserById(id) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE id = ?';
      db.get(query, [id], (err, row) => {
        if (err) return reject(err);
        resolve(row);
      });
    });
  },

  updateUser(id, name, email) {
    return new Promise((resolve, reject) => {
      const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
      db.run(query, [name, email, id], function (err) {
        if (err) return reject(err);
        resolve({ id, name, email });
      });
    });
  },

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      const query = 'DELETE FROM users WHERE id = ?';
      db.run(query, [id], function (err) {
        if (err) return reject(err);
        resolve({ id });
      });
    });
  },

  getAllUsers() {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users';
      db.all(query, [], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  },
};
