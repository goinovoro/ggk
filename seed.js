const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');

const db = new Database('dev.db');

// Enable WAL mode
db.pragma('journal_mode = WAL');

const users = [
  {
    id: 'u-admin',
    email: 'admin@ggk.com',
    name: 'Mister Tani (Admin)',
    password: 'password123',
    role: 'ADMIN'
  },
  {
    id: 'u-dispatcher',
    email: 'dispatcher@ggk.com',
    name: 'Mister Tani (Dispatcher)',
    password: 'password123',
    role: 'DISPATCHER'
  },
  {
    id: 'u-customer',
    email: 'customer@ggk.com',
    name: 'Budi Santoso',
    password: 'password123',
    role: 'CUSTOMER'
  },
  {
    id: 'u-packer',
    email: 'packer@ggk.com',
    name: 'Ahmad Packer',
    password: 'password123',
    role: 'PACKER'
  },
  {
    id: 'u-operator',
    email: 'operator@ggk.com',
    name: 'Yudi Operator',
    password: 'password123',
    role: 'OPERATOR'
  }
];

console.log('Seeding default users...');

try {
  db.prepare('DELETE FROM User').run();

  const insert = db.prepare(`
    INSERT INTO User (id, email, name, password, role, createdAt, updatedAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  for (const user of users) {
    const hashedPassword = bcrypt.hashSync(user.password, 12);
    const now = new Date().toISOString();
    insert.run(
      user.id,
      user.email,
      user.name,
      hashedPassword,
      user.role,
      now,
      now
    );
    console.log(`Seeded user: ${user.email} (${user.role})`);
  }

  console.log('Database seeded successfully!');
} catch (err) {
  console.error('Error seeding database:', err);
} finally {
  db.close();
}
