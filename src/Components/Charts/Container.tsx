import { useAppSelector } from "../../store/hooks";
import { useMemo } from "react";
import NetworthChart from "./NetworthChart";

const Charts = () => {
  const transactions = useAppSelector((state) => state.tx.transactions);

  const txArray = useMemo(() => {
    return Object.values(transactions).toSorted(
      (a, b) => a.timestamp - b.timestamp
    );
  }, [transactions]);

  const props = useMemo(() => {
    const props: {
      incomes: Record<string, number>;
      expenses: Record<string, number>;
      networth: { date: Date; value: number }[];
    } = { incomes: {}, expenses: {}, networth: [] };

    let networth = 0;
    for (const tx of txArray) {
      if (tx.type === "income") {
        props.incomes[tx.category] =
          (props.incomes[tx.category] || 0) + tx.value;
      } else {
        props.expenses[tx.category] =
          (props.expenses[tx.category] || 0) + tx.value;
      }
      networth += tx.type === "income" ? tx.value : -tx.value;
      props.networth.push({ date: new Date(tx.timestamp), value: networth });
    }
    return props;
  }, [txArray]);

  if (!txArray.length) return;
  return (
    <div>
      {txArray.length > 1 && <NetworthChart networth={props.networth} />}
    </div>
  );
};

export default Charts;
