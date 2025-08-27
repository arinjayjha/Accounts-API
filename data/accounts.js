let accounts = [
  { id: 1, holder: "Alice", balance: 5000 },
  { id: 2, holder: "Bob", balance: 3000 }
];

const initial = accounts.map(a => ({ ...a }));

function list() {
  return accounts;
}

function find(id) {
  return accounts.find(a => a.id === Number(id));
}

function add(account) {
  accounts.push(account);
  return account;
}

function update(id, patch) {
  const idx = accounts.findIndex(a => a.id === Number(id));
  if (idx === -1) return null;
  accounts[idx] = { ...accounts[idx], ...patch };
  return accounts[idx];
}

function remove(id) {
  const idx = accounts.findIndex(a => a.id === Number(id));
  if (idx === -1) return null;
  const [removed] = accounts.splice(idx, 1);
  return removed;
}

function reset() {
  accounts = initial.map(a => ({ ...a }));
}

module.exports = { list, find, add, update, remove, reset };
