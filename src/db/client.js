const worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });

const pending = new Map();
let nextId = 0;
let acceptingWrites = false;
let writeChain = Promise.resolve();

worker.onmessage = (event) => {
  const { id, ok, result, error } = event.data;
  const request = pending.get(id);
  if (!request) return;
  pending.delete(id);
  if (ok) request.resolve(result);
  else request.reject(new Error(error));
};

worker.onerror = (event) => {
  const message = event.message || 'Finance database worker failed';
  pending.forEach((request) => request.reject(new Error(message)));
  pending.clear();
};

function request(type, payload) {
  const id = ++nextId;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    worker.postMessage({ id, type, payload });
  });
}

export function loadFinance() {
  return request('load');
}

export function startSaving() {
  acceptingWrites = true;
}

export function saveChange(type, payload) {
  if (!acceptingWrites) return;
  writeChain = writeChain
    .then(() => request(type, payload))
    .catch((error) => {
      console.error('Failed to save finance data', error);
    });
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    worker.terminate();
  });
}
