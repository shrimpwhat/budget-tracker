import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setRange } from "../../store/dateRangeSlice";
import "./range-input.scss";

const RangeInputForm = () => {
  const { start, end } = useAppSelector((state) => state.dateRange);
  const dispatch = useAppDispatch();

  const getDateString = (timestamp: number) => {
    return timestamp === 0 || timestamp === Infinity
      ? undefined
      : new Date(timestamp).toISOString().split("T")[0];
  };

  const getUTCTimestamp = (date: Date) => {
    return date.getTime() + date.getTimezoneOffset() * 60000;
  };

  const handleDateChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    variant: "start" | "end"
  ) => {
    const date = e.target.valueAsDate;
    let args: [number, number];
    if (date)
      args =
        variant === "start"
          ? [getUTCTimestamp(date), end]
          : [start, getUTCTimestamp(date)];
    else args = variant === "start" ? [0, end] : [start, Infinity];
    localStorage.setItem("range-start", args[0].toString());
    localStorage.setItem("range-end", args[1].toString());
    dispatch(setRange(args));
  };

  return (
    <form className="range-form">
      <input
        type="date"
        defaultValue={getDateString(start)}
        onChange={(e) => handleDateChange(e, "start")}
        className="range-form__input"
      />
      <hr />
      <input
        type="date"
        defaultValue={getDateString(end)}
        onChange={(e) => handleDateChange(e, "end")}
        className="range-form__input"
      />
    </form>
  );
};

export default RangeInputForm;
