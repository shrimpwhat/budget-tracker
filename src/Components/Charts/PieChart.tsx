import { PieChart } from "@mui/x-charts";

const Chart = ({
  data,
  title,
}: {
  data: { label: string; value: number; id: string }[];
  title: string;
}) => {
  return (
    <div>
      <h3 className="chart__title">{title}</h3>
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 70,
            cornerRadius: 5,
            highlightScope: { highlighted: "item", faded: "global" },
          },
        ]}
        height={300}
      />
    </div>
  );
};

export default Chart;
