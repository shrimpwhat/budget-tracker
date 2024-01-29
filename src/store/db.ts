import { DBSchema, openDB } from "idb";
import { Tx } from "./txSlice";

interface AppDB extends DBSchema {
  txs: {
    key: number;
    value: Omit<Tx, "id">;
  };
}

const db = await openDB<AppDB>("app-db", 1, {
  upgrade(db) {
    db.createObjectStore("txs", {
      keyPath: "id",
      autoIncrement: true,
    });
  },
});

export default db;
