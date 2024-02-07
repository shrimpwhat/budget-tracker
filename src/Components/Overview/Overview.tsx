import { useAppSelector } from "../../store/hooks";
import "./overview.scss";
import Card from "./Card";

const Overview = () => {
  const stats = useAppSelector((state) => state.tx.stats);

  return (
    <section>
      <div className="overview">
        <Card type="income" content={stats.incomes} />
        <Card type="expense" content={stats.expenses} />
      </div>
    </section>
  );
};

export default Overview;
