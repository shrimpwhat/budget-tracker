import "./card.scss";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { CurrencyString } from "../../utils";

interface ICardProps {
  type: "income" | "expense";
  content: {
    sum: number;
    max: {
      value: number;
      category: string;
    };
    min: {
      value: number;
      category: string;
    };
  };
}

const Card = ({ type, content }: ICardProps) => {
  return (
    <div className={"card " + type}>
      <h1 className="card__title">
        {type === "income" ? "Доходы" : "Расходы"}
        {": "}
        <span className="card__title-sum">{CurrencyString(content.sum)}</span>
      </h1>
      <ul className="card__content">
        <li className="list-item">
          <ArrowUpwardIcon className="list-item__icon" />
          <p className="list-item__subtitle">Максимум</p>
          <p className="list-item__description">
            {content.max.category}
            {content.max.category !== "Нет данных" && (
              <>
                {": "}
                <span className="list-item__value">
                  {CurrencyString(content.max.value)}
                </span>
              </>
            )}
          </p>
        </li>
        <li className="list-item">
          <ArrowDownwardIcon className="list-item__icon" />
          <p className="list-item__subtitle">Минимум</p>
          <p className="list-item__description">
            {content.min.category}
            {content.min.category !== "Нет данных" && (
              <>
                {": "}
                <span className="list-item__value">
                  {CurrencyString(content.min.value)}
                </span>
              </>
            )}
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Card;
