import type { FinanceSnapshot, Transaction, TransactionInput } from '../types';
import { isTransactionType } from '../types';

const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

interface PendingRequest {
  resolve: (value: unknown) => void;
  reject: (reason: Error) => void;
}

interface WorkerResponse {
  id: number;
  ok: boolean;
  result?: unknown;
  error?: string;
}

const pending = new Map<number, PendingRequest>();
let nextId = 0;
let acceptingWrites = false;
let writeChain: Promise<void> = Promise.resolve();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isTransaction(value: unknown): value is Transaction {
  if (!isRecord(value)) return false;
  return (
    typeof value.id === 'number'
    && typeof value.amount === 'number'
    && typeof value.category === 'string'
    && typeof value.date === 'string'
    && typeof value.description === 'string'
    && isTransactionType(value.type)
  );
}

function isFinanceSnapshot(value: unknown): value is FinanceSnapshot {
  if (!isRecord(value)) return false;
  if (!Array.isArray(value.transactions) || !value.transactions.every(isTransaction)) return false;
  if (!Array.isArray(value.categories) || !value.categories.every((item) => typeof item === 'string')) return false;
  if (value.exampleUser !== null && typeof value.exampleUser !== 'string') return false;
  if (!isRecord(value.budget)) return false;
  return Object.values(value.budget).every((amount) => typeof amount === 'number');
}

function isWorkerResponse(value: unknown): value is WorkerResponse {
  if (!isRecord(value)) return false;
  return typeof value.id === 'number' && typeof value.ok === 'boolean';
}

worker.onmessage = (event: MessageEvent) => {
  if (!isWorkerResponse(event.data)) return;
  const { id, ok, result, error } = event.data;
  const request = pending.get(id);
  if (!request) return;
  pending.delete(id);
  if (ok) request.resolve(result);
  else request.reject(new Error(error ?? 'Finance database request failed'));
};

worker.onerror = (event: ErrorEvent) => {
  const message = event.message || 'Finance database worker failed';
  pending.forEach((request) => request.reject(new Error(message)));
  pending.clear();
};

function request(type: string, payload?: unknown): Promise<unknown> {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, type, payload });
  });
}

export function loadFinance(): Promise<FinanceSnapshot> {
  return request('load').then((result) => {
    if (!isFinanceSnapshot(result)) {
      throw new Error('Finance database returned an unexpected snapshot');
    }
    return result;
  });
}

export function startSaving(): void {
  acceptingWrites = true;
}

export function saveChange(type: 'addTransaction', payload: Transaction): void;
export function saveChange(type: 'deleteTransaction', payload: number): void;
export function saveChange(type: 'updateTransaction', payload: Transaction): void;
export function saveChange(type: 'updateBudget', payload: { category: string; amount: number }): void;
export function saveChange(type: 'addCategory', payload: string): void;
export function saveChange(type: 'removeCategory', payload: string): void;
export function saveChange(type: string, payload?: Transaction | TransactionInput | number | string | { category: string; amount: number }): void {
  if (!acceptingWrites) return;
  writeChain = writeChain
    .then(() => request(type, payload))
    .then(() => undefined)
    .catch((error: unknown) => {
      console.error('Failed to save finance data', error);
    });
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    worker.terminate();
  });
}
