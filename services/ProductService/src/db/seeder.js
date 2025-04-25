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

// Sample product data
const products = [
  { name: 'Indomie Goreng', description: 'Indonesian instant fried noodles', sugar_intake: 8, salt_intake: 1.8 },
  { name: 'Coca-Cola', description: 'Carbonated soft drink', sugar_intake: 39, salt_intake: 0.05 },
  { name: 'Oreo Cookies', description: 'Sandwich cookies with cream filling', sugar_intake: 14, salt_intake: 0.3 },
  { name: 'Potato Chips', description: 'Thinly sliced potato deep-fried', sugar_intake: 0.5, salt_intake: 1.2 },
  { name: 'Yogurt', description: 'Fermented dairy product', sugar_intake: 17, salt_intake: 0.1 },
  { name: 'Chocolate Bar', description: 'Sweet chocolate confection', sugar_intake: 24, salt_intake: 0.1 },
  { name: 'Instant Coffee', description: 'Powdered coffee beverage', sugar_intake: 0, salt_intake: 0.01 }
];

// Initialize table and insert sample data
db.serialize(() => {
  // Create table if not exists
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    sugar_intake REAL NOT NULL,
    salt_intake REAL NOT NULL
  )`);
  
  // Delete existing data
  db.run('DELETE FROM products');
  
  // Reset autoincrement counter
  db.run('DELETE FROM sqlite_sequence WHERE name="products"');
  
  // Insert sample data
  const insertStmt = db.prepare('INSERT INTO products (name, description, sugar_intake, salt_intake) VALUES (?, ?, ?, ?)');
  products.forEach(product => {
    insertStmt.run(product.name, product.description, product.sugar_intake, product.salt_intake);
  });
  insertStmt.finalize();
  
  // Verify data was inserted
  db.all('SELECT * FROM products', [], (err, rows) => {
    if (err) {
      console.error('Error querying products:', err);
      return;
    }
    console.log('Products seeded successfully:');
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