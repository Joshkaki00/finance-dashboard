import sqlite3InitModule from '@sqlite.org/sqlite-wasm';

const DEFAULT_CATEGORIES = ['income', 'groceries', 'utilities', 'entertainment', 'other'];

let db;

function asNumber(value) {
  return typeof value === 'bigint' ? Number(value) : Number(value);
}

function query(sql, bind = []) {
  return db.exec({
    sql,
    bind,
    rowMode: 'object',
    returnValue: 'resultRows',
  });
}

function run(sql, bind = []) {
  db.exec({ sql, bind });
}

async function openDatabase() {
  const sqlite3 = await sqlite3InitModule({
    print() {},
    printErr(...args) {
      console.error(...args);
    },
  });

  // opfs-sahpool persists in the Origin Private File System and does not need
  // COOP/COEP headers, which GitHub Pages cannot set.
  // https://sqlite.org/wasm/doc/trunk/persistence.md
  const pool = await sqlite3.installOpfsSAHPoolVfs({
    directory: '/finance-dashboard-db',
    name: 'finance-dashboard',
  });

  db = new pool.OpfsSAHPoolDb('/finance.sqlite3');
  run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY,
      amount REAL NOT NULL,
      category TEXT NOT NULL,
      date TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      type TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS budgets (
      category TEXT PRIMARY KEY,
      amount REAL NOT NULL
    );
    CREATE TABLE IF NOT EXISTS categories (
      name TEXT PRIMARY KEY,
      position INTEGER NOT NULL
    );
  `);
  seed();
}

function seed() {
  const existing = query('SELECT COUNT(*) AS count FROM categories');
  if (asNumber(existing[0].count) > 0) return;

  run('BEGIN');
  try {
    DEFAULT_CATEGORIES.forEach((name, position) => {
      run('INSERT INTO categories (name, position) VALUES (?, ?)', [name, position]);
      run('INSERT INTO budgets (category, amount) VALUES (?, 0)', [name]);
    });
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }
}

function load() {
  const categories = query('SELECT name FROM categories ORDER BY position, name')
    .map((row) => String(row.name));

  const budget = {};
  categories.forEach((name) => {
    budget[name] = 0;
  });
  query('SELECT category, amount FROM budgets').forEach((row) => {
    budget[String(row.category)] = asNumber(row.amount);
  });

  const transactions = query(
    'SELECT id, amount, category, date, description, type FROM transactions ORDER BY id'
  ).map((row) => ({
    id: asNumber(row.id),
    amount: asNumber(row.amount),
    category: String(row.category),
    date: String(row.date),
    description: String(row.description ?? ''),
    type: String(row.type),
  }));

  return { transactions, budget, categories };
}

function apply(type, payload) {
  switch (type) {
    case 'load':
      return load();
    case 'addTransaction':
      run(
        'INSERT INTO transactions (id, amount, category, date, description, type) VALUES (?, ?, ?, ?, ?, ?)',
        [
          payload.id,
          payload.amount,
          payload.category,
          payload.date,
          payload.description ?? '',
          payload.type,
        ]
      );
      return null;
    case 'deleteTransaction':
      run('DELETE FROM transactions WHERE id = ?', [payload]);
      return null;
    case 'updateTransaction':
      run(
        'UPDATE transactions SET amount = ?, category = ?, date = ?, description = ?, type = ? WHERE id = ?',
        [
          payload.amount,
          payload.category,
          payload.date,
          payload.description ?? '',
          payload.type,
          payload.id,
        ]
      );
      return null;
    case 'updateBudget':
      run(
        `INSERT INTO budgets (category, amount) VALUES (?, ?)
         ON CONFLICT(category) DO UPDATE SET amount = excluded.amount`,
        [payload.category, payload.amount]
      );
      return null;
    case 'addCategory': {
      const next = query('SELECT COALESCE(MAX(position), -1) + 1 AS position FROM categories');
      run(
        'INSERT OR IGNORE INTO categories (name, position) VALUES (?, ?)',
        [payload, asNumber(next[0].position)]
      );
      run('INSERT OR IGNORE INTO budgets (category, amount) VALUES (?, 0)', [payload]);
      return null;
    }
    case 'removeCategory':
      run('DELETE FROM categories WHERE name = ?', [payload]);
      return null;
    default:
      throw new Error(`Unknown database request: ${type}`);
  }
}

let chain = Promise.resolve();

globalThis.onmessage = (event) => {
  const message = event.data;
  chain = chain.then(async () => {
    try {
      if (!db) await openDatabase();
      const result = apply(message.type, message.payload);
      globalThis.postMessage({ id: message.id, ok: true, result });
    } catch (error) {
      globalThis.postMessage({
        id: message.id,
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      });
    }
  });
};
