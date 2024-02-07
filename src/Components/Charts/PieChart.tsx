import { PieChart, cheerfulFiestaPalette } from "@mui/x-charts";

const Chart = ({
  data,
  title,
}: {
  data: { label: string; value: number; id: string }[];
  title: string;
}) => {
  return (
    <div className="chart">
      <h3 className="chart__title">{title}</h3>
      <PieChart
        series={[
          {
            data: data,
            innerRadius: 60,
            outerRadius: 140,

            cornerRadius: 5,
            highlightScope: { highlighted: "item", faded: "global" },
          },
        ]}
        colors={cheerfulFiestaPalette}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "top", horizontal: "middle" },
          },
        }}
        margin={{
          top: 150,
          right: 0,
        }}
        height={500}
      />
    </div>
  );
};

export default Chart;
