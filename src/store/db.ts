import { DBSchema, openDB } from "idb";
import { Tx } from "./txSlice";

interface AppDB extends DBSchema {
  txs: {
    key: string;
    value: Tx;
    // indexes: { "by-date": number };
  };
  // categories: {
  //   key: string;
  //   value: {
  //     name: string;
  //   };
  // };
}

const db = await openDB<AppDB>("app-db", 1, {
  upgrade(db) {
    db.createObjectStore("txs", {
      keyPath: "id",
      autoIncrement: true,
    });
    // store.createIndex("by-date", "timestamp");
    // db.createObjectStore("categories", {
    //   keyPath: "id",
    //   autoIncrement: true,
    // });
  },
});

export default db;