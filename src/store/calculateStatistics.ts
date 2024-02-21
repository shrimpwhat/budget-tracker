import { TransactionStats, emptyCategory } from "./txSlice";

const calcStats = (transactions: Record<number, Tx>) => {
  const stats: TransactionStats = {
    incomes: {
      sum: 0,
      categories: [],
      max: { value: 0, category: emptyCategory },
      min: { value: Infinity, category: emptyCategory },
    },
    expenses: {
      sum: 0,
      categories: [],
      max: { value: 0, category: emptyCategory },
      min: { value: Infinity, category: emptyCategory },
    },
    networth: [],
  };
  const categoriesSum: {
    incomes: Record<string, number>;
    expenses: Record<string, number>;
  } = { incomes: {}, expenses: {} };

  const networthMap: Record<number, number> = {}
  let networth = 0;
  for (const tx of Object.values(transactions).toSorted(
    (a, b) => a.timestamp - b.timestamp
  )) {
    const category = tx.category;
    if (tx.type === "income") {
      networth += tx.value;
      stats.incomes.sum += tx.value;
      categoriesSum.incomes[category] =
        (categoriesSum.incomes[category] ?? 0) + tx.value;
    } else {
      networth -= tx.value;
      stats.expenses.sum += tx.value;
      categoriesSum.expenses[category] =
        (categoriesSum.expenses[category] ?? 0) + tx.value;
    }
    networthMap[tx.timestamp] = (networthMap[tx.timestamp] ?? 0) + networth
  }

  stats.networth = Object.entries(networthMap).map(([timestamp, value]) => ({ timestamp: Number(timestamp), value }))
  Object.entries(categoriesSum.incomes).forEach(([key, value], index) => {
    stats.incomes.categories.push({
      id: index.toString(),
      label: key,
      value,
    });
    if (value > stats.incomes.max.value)
      stats.incomes.max = {
        value: value,
        category: key,
      };
    if (value < stats.incomes.min.value)
      stats.incomes.min = {
        value,
        category: key,
      };
  });
  Object.entries(categoriesSum.expenses).forEach(([key, value], index) => {
    stats.expenses.categories.push({
      id: index.toString(),
      label: key,
      value,
    });
    if (value > stats.expenses.max.value)
      stats.expenses.max = {
        value: value,
        category: key,
      };
    if (value < stats.expenses.min.value)
      stats.expenses.min = {
        value,
        category: key,
      };
  });
  return stats;
};

export default calcStats;
