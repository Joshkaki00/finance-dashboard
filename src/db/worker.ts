import sqlite3InitModule, {
  type BindingSpec,
  type Database,
  type SqlValue,
} from '@sqlite.org/sqlite-wasm';
import type {
  BudgetMap,
  FinanceSnapshot,
  Transaction,
  TransactionType,
} from '../types';

const DEFAULT_CATEGORIES = ['income', 'groceries', 'utilities', 'entertainment', 'other'];

let db: Database | undefined;

function requireDb(): Database {
  if (!db) {
    throw new Error('Finance database is not open');
  }
  return db;
}

function asNumber(value: SqlValue | undefined): number {
  if (typeof value === 'bigint' || typeof value === 'number') return Number(value);
  if (typeof value === 'string') {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function asTransactionType(value: SqlValue | undefined): TransactionType {
  return value === 'income' ? 'income' : 'expense';
}

function asText(value: SqlValue | undefined): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'bigint') return String(value);
  return '';
}

function query(sql: string, bind: BindingSpec = []): Record<string, SqlValue>[] {
  return requireDb().exec({
    sql,
    bind,
    rowMode: 'object',
    returnValue: 'resultRows',
  });
}

function run(sql: string, bind: BindingSpec = []): void {
  requireDb().exec({ sql, bind });
}

async function openDatabase(): Promise<void> {
  const sqlite3 = await sqlite3InitModule();

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
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
  `);
  seed();
}

const EXAMPLE_USER = 'Alex Rivera';
const EXAMPLE_IDS = [1, 2, 3, 4, 5, 6];
const EXAMPLE_BUDGETS: BudgetMap = {
  income: 4200,
  groceries: 500,
  utilities: 180,
  entertainment: 120,
  other: 150,
};

function daysAgo(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() - days);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${date.getFullYear()}-${month}-${day}`;
}

function seed(): void {
  const existing = query('SELECT COUNT(*) AS count FROM categories');
  if (asNumber(existing[0]?.count) === 0) {
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

  seedExampleUser();
}

function seedExampleUser(): void {
  const marker = query("SELECT value FROM meta WHERE key = 'initialized'");
  if (marker.length > 0) return;

  const transactionCount = asNumber(query('SELECT COUNT(*) AS count FROM transactions')[0]?.count);
  const budgetTotal = asNumber(query('SELECT COALESCE(SUM(amount), 0) AS total FROM budgets')[0]?.total);
  if (transactionCount > 0 || budgetTotal > 0) {
    run("INSERT INTO meta (key, value) VALUES ('initialized', 'user')");
    return;
  }

  const sample: BindingSpec[] = [
    [1, 4200, 'income', daysAgo(2), 'Paycheck', 'income'],
    [2, 86.42, 'groceries', daysAgo(1), 'Market run', 'expense'],
    [3, 142.18, 'utilities', daysAgo(4), 'Electric bill', 'expense'],
    [4, 28, 'entertainment', daysAgo(3), 'Movie night', 'expense'],
    [5, 54.1, 'groceries', daysAgo(6), 'Groceries', 'expense'],
    [6, 64, 'other', daysAgo(5), 'Transit pass', 'expense'],
  ];

  run('BEGIN');
  try {
    sample.forEach((row) => {
      run(
        'INSERT INTO transactions (id, amount, category, date, description, type) VALUES (?, ?, ?, ?, ?, ?)',
        row,
      );
    });
    Object.entries(EXAMPLE_BUDGETS).forEach(([category, amount]) => {
      run(
        `INSERT INTO budgets (category, amount) VALUES (?, ?)
         ON CONFLICT(category) DO UPDATE SET amount = excluded.amount`,
        [category, amount],
      );
    });
    run("INSERT INTO meta (key, value) VALUES ('initialized', 'example')");
    run('COMMIT');
  } catch (error) {
    run('ROLLBACK');
    throw error;
  }
}

function showingExampleUser(): string | null {
  const marker = query("SELECT value FROM meta WHERE key = 'initialized'");
  if (marker[0]?.value !== 'example') return null;

  const ids = query('SELECT id FROM transactions ORDER BY id').map((row) => asNumber(row.id));
  const sameTransactions = ids.length === EXAMPLE_IDS.length && ids.every((id, index) => id === EXAMPLE_IDS[index]);
  return sameTransactions ? EXAMPLE_USER : null;
}

function load(): FinanceSnapshot {
  const categories = query('SELECT name FROM categories ORDER BY position, name')
    .map((row) => asText(row.name));

  const budget: BudgetMap = {};
  categories.forEach((name) => {
    budget[name] = 0;
  });
  query('SELECT category, amount FROM budgets').forEach((row) => {
    budget[asText(row.category)] = asNumber(row.amount);
  });

  const transactions: Transaction[] = query(
    'SELECT id, amount, category, date, description, type FROM transactions ORDER BY id',
  ).map((row) => ({
    id: asNumber(row.id),
    amount: asNumber(row.amount),
    category: asText(row.category),
    date: asText(row.date),
    description: asText(row.description),
    type: asTransactionType(row.type),
  }));

  return { transactions, budget, categories, exampleUser: showingExampleUser() };
}

type WorkerRequest =
  | { id: number; type: 'load'; payload?: undefined }
  | { id: number; type: 'addTransaction'; payload: Transaction }
  | { id: number; type: 'deleteTransaction'; payload: number }
  | { id: number; type: 'updateTransaction'; payload: Transaction }
  | { id: number; type: 'updateBudget'; payload: { category: string; amount: number } }
  | { id: number; type: 'addCategory'; payload: string }
  | { id: number; type: 'removeCategory'; payload: string };

function apply(message: WorkerRequest): FinanceSnapshot | null {
  switch (message.type) {
    case 'load':
      return load();
    case 'addTransaction':
      run(
        'INSERT INTO transactions (id, amount, category, date, description, type) VALUES (?, ?, ?, ?, ?, ?)',
        [
          message.payload.id,
          message.payload.amount,
          message.payload.category,
          message.payload.date,
          message.payload.description,
          message.payload.type,
        ],
      );
      return null;
    case 'deleteTransaction':
      run('DELETE FROM transactions WHERE id = ?', [message.payload]);
      return null;
    case 'updateTransaction':
      run(
        'UPDATE transactions SET amount = ?, category = ?, date = ?, description = ?, type = ? WHERE id = ?',
        [
          message.payload.amount,
          message.payload.category,
          message.payload.date,
          message.payload.description,
          message.payload.type,
          message.payload.id,
        ],
      );
      return null;
    case 'updateBudget':
      run(
        `INSERT INTO budgets (category, amount) VALUES (?, ?)
         ON CONFLICT(category) DO UPDATE SET amount = excluded.amount`,
        [message.payload.category, message.payload.amount],
      );
      return null;
    case 'addCategory': {
      const next = query('SELECT COALESCE(MAX(position), -1) + 1 AS position FROM categories');
      run(
        'INSERT OR IGNORE INTO categories (name, position) VALUES (?, ?)',
        [message.payload, asNumber(next[0]?.position)],
      );
      run('INSERT OR IGNORE INTO budgets (category, amount) VALUES (?, 0)', [message.payload]);
      return null;
    }
    case 'removeCategory':
      run('DELETE FROM categories WHERE name = ?', [message.payload]);
      return null;
    default:
      return null;
  }
}

let chain = Promise.resolve();

globalThis.onmessage = (event: MessageEvent) => {
  const message = event.data as WorkerRequest;
  chain = chain.then(async () => {
    try {
      if (!db) await openDatabase();
      const result = apply(message);
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
