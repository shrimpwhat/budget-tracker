import { useMemo } from "react";
import { useAppSelector } from "../../store/hooks";
import "./overview.scss";
import Card from "./Card";

const Overview = () => {
  const transactions = useAppSelector((state) => state.tx.transactions);
  const { income, expense } = useMemo(() => {
    const emptyCategory = "Нет данных";
    const acc = {
      income: {
        sum: 0,
        max: { value: 0, category: emptyCategory },
        min: { value: Infinity, category: emptyCategory },
      },
      expense: {
        sum: 0,
        max: { value: 0, category: emptyCategory },
        min: { value: Infinity, category: emptyCategory },
      },
    };
    for (const id in transactions) {
      const tx = transactions[id];
      if (tx.type === "income") {
        if (tx.value > acc.income.max.value)
          acc.income.max = { value: tx.value, category: tx.category };
        if (tx.value < acc.income.min.value)
          acc.income.min = { value: tx.value, category: tx.category };
        acc.income.sum += tx.value;
      } else {
        if (tx.value > acc.expense.max.value)
          acc.expense.max = { value: tx.value, category: tx.category };
        if (tx.value < acc.expense.min.value)
          acc.expense.min = { value: tx.value, category: tx.category };
        acc.expense.sum += tx.value;
      }
    }
    return acc;
  }, [transactions]);

  return (
    <section>
      <div className="overview">
        <Card type="income" content={income} />
        <Card type="expense" content={expense} />
      </div>
    </section>
  );
};

export default Overview;
