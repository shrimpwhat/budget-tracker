import { useAppSelector } from "../../store/hooks";
import { useMemo } from "react";
import NetworthChart from "./NetworthChart";
import PieChart from "./PieChart";
import "./charts.scss";

const Charts = () => {
  const transactions = useAppSelector((state) => state.tx.transactions);

  const txArray = useMemo(() => {
    return Object.values(transactions).toSorted(
      (a, b) => a.timestamp - b.timestamp
    );
  }, [transactions]);

  const props = useMemo(() => {
    const props: {
      incomes: { label: string; value: number; id: string }[];
      expenses: { label: string; value: number; id: string }[];
      networth: { date: Date; value: number }[];
    } = { incomes: [], expenses: [], networth: [] };

    let networth = 0;
    const sumMap: {
      incomes: Record<string, number>;
      expenses: Record<string, number>;
    } = {
      incomes: {},
      expenses: {},
    };
    for (const tx of txArray) {
      if (tx.type === "income") {
        sumMap.incomes[tx.category] =
          (sumMap.incomes[tx.category] || 0) + tx.value;
      } else {
        sumMap.expenses[tx.category] =
          (sumMap.expenses[tx.category] || 0) + tx.value;
      }
      networth += tx.type === "income" ? tx.value : -tx.value;
      props.networth.push({ date: new Date(tx.timestamp), value: networth });
    }
    props.incomes = Object.entries(sumMap.incomes).map(
      ([category, value], index) => ({
        id: index.toString(),
        label: category,
        value,
      })
    );
    props.expenses = Object.entries(sumMap.expenses).map(
      ([category, value], index) => ({
        id: index.toString(),
        label: category,
        value,
      })
    );

    return props;
  }, [txArray]);

  if (txArray.length <= 1) return;
  return (
    <section>
      <div>
        <div className="pie-charts">
          {props.incomes.length > 1 && (
            <PieChart data={props.incomes} title="Доходы" />
          )}
          {props.expenses.length > 1 && (
            <PieChart data={props.expenses} title="Расходы" />
          )}
        </div>
        <NetworthChart networth={props.networth} />
      </div>
    </section>
  );
};

export default Charts;
