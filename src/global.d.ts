declare interface Tx {
  type: "income" | "expense";
  category: string;
  value: number;
  timestamp: number;
  note: string;
}
