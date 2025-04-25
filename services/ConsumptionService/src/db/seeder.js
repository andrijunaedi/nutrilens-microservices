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

// Sample consumption data
// This assumes that users with IDs 1-5 and products with IDs 1-7 exist
const consumptions = [
  { user_id: 1, product_id: 1, date: '2023-11-01', quantity: 1 },
  { user_id: 1, product_id: 3, date: '2023-11-01', quantity: 2 },
  { user_id: 1, product_id: 5, date: '2023-11-02', quantity: 1 },
  { user_id: 2, product_id: 2, date: '2023-11-01', quantity: 1.5 },
  { user_id: 2, product_id: 6, date: '2023-11-02', quantity: 1 },
  { user_id: 3, product_id: 4, date: '2023-11-01', quantity: 2.5 },
  { user_id: 3, product_id: 7, date: '2023-11-02', quantity: 3 },
  { user_id: 4, product_id: 1, date: '2023-11-01', quantity: 1 },
  { user_id: 4, product_id: 2, date: '2023-11-01', quantity: 1 },
  { user_id: 5, product_id: 3, date: '2023-11-02', quantity: 2 },
  { user_id: 5, product_id: 5, date: '2023-11-02', quantity: 1.5 }
];

// Initialize table and insert sample data
db.serialize(() => {
  // Create table if not exists
  db.run(`CREATE TABLE IF NOT EXISTS consumptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    date TEXT NOT NULL,
    quantity REAL NOT NULL
  )`);
  
  // Delete existing data
  db.run('DELETE FROM consumptions');
  
  // Reset autoincrement counter
  db.run('DELETE FROM sqlite_sequence WHERE name="consumptions"');
  
  // Insert sample data
  const insertStmt = db.prepare('INSERT INTO consumptions (user_id, product_id, date, quantity) VALUES (?, ?, ?, ?)');
  consumptions.forEach(consumption => {
    insertStmt.run(consumption.user_id, consumption.product_id, consumption.date, consumption.quantity);
  });
  insertStmt.finalize();
  
  // Verify data was inserted
  db.all('SELECT * FROM consumptions', [], (err, rows) => {
    if (err) {
      console.error('Error querying consumptions:', err);
      return;
    }
    console.log('Consumptions seeded successfully:');
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