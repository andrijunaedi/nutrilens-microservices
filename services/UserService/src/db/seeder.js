const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbDir = path.resolve(__dirname);
const dbPath = path.join(dbDir, 'database.sqlite');

// Ensure the database directory exists
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

// Sample user data
const users = [
  { name: 'John Doe', email: 'john.doe@example.com' },
  { name: 'Jane Smith', email: 'jane.smith@example.com' },
  { name: 'Michael Johnson', email: 'michael.johnson@example.com' },
  { name: 'Emily Brown', email: 'emily.brown@example.com' },
  { name: 'David Wilson', email: 'david.wilson@example.com' }
];

// Initialize table and insert sample data
db.serialize(() => {
  // Create table if not exists
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
  )`);
  
  // Delete existing data
  db.run('DELETE FROM users');
  
  // Reset autoincrement counter
  db.run('DELETE FROM sqlite_sequence WHERE name="users"');
  
  // Insert sample data
  const insertStmt = db.prepare('INSERT INTO users (name, email) VALUES (?, ?)');
  users.forEach(user => {
    insertStmt.run(user.name, user.email);
  });
  insertStmt.finalize();
  
  // Verify data was inserted
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      console.error('Error querying users:', err);
      return;
    }
    console.log('Users seeded successfully:');
    console.table(rows);
  });
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database:', err);
  } else {
    console.log('Database connection closed');
  }
});