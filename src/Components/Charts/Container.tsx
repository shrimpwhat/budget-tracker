import { useAppSelector } from "../../store/hooks";
import NetworthChart from "./NetworthChart";
import PieChart from "./PieChart";
import "./charts.scss";

const Charts = () => {
  const stats = useAppSelector((state) => state.tx.stats);

  return (
    <section>
      <div>
        <div className="pie-charts">
          {stats.incomes.categories.length > 1 && (
            <PieChart data={stats.incomes.categories} title="Доходы" />
          )}
          {stats.expenses.categories.length > 1 && (
            <PieChart data={stats.expenses.categories} title="Расходы" />
          )}
        </div>
        {stats.networth.length > 1 && (
          <NetworthChart networth={stats.networth} />
        )}
      </div>
    </section>
  );
};

export default Charts;
