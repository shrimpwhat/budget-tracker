import "./card.scss";
import ArrowUpIcon from "../assets/ArrowUp.svg?react";
import ArrowDownIcon from "../assets/ArrowDown.svg?react";

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
        <span className="card__title-sum">{content.sum}₽</span>
      </h1>
      <ul className="card__content">
        <li className="list-item">
          <div className="list-item__icon">
            <ArrowUpIcon />
          </div>
          <p className="list-item__subtitle">Максимум</p>
          <p className="list-item__description">
            {content.max.category}:{" "}
            <span className="list-item__value">{content.max.value}₽</span>
          </p>
        </li>
        <li className="list-item">
          <div className="list-item__icon">
            <ArrowDownIcon />
          </div>
          <p className="list-item__subtitle">Минимум</p>
          <p className="list-item__description">
            {content.min.category}:{" "}
            <span className="list-item__value">{content.min.value}₽</span>
          </p>
        </li>
      </ul>
    </div>
  );
};

export default Card;
