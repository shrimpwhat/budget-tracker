import { DBSchema, openDB } from "idb";

interface AppDB extends DBSchema {
  transactions: {
    key: number;
    value: Tx;
  };
}

const db = await openDB<AppDB>("budget-db", 1, {
  upgrade(db) {
    db.createObjectStore("transactions", {
      autoIncrement: true,
    });
  },
});

export default db;
