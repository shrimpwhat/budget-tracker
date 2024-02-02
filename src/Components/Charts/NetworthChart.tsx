import { LineChart, useDrawingArea, useYScale } from "@mui/x-charts";

function ColorSwich() {
  const { top, height, bottom } = useDrawingArea();
  const svgHeight = top + bottom + height;

  const scale = useYScale();
  const y0 = scale(0);
  const off = y0 !== undefined ? y0 / svgHeight : 0;

  const styles = window.getComputedStyle(document.documentElement);
  const green = styles.getPropertyValue("--color-green");
  const red = styles.getPropertyValue("--color-red");

  return (
    <defs>
      <linearGradient
        id={"switch-color"}
        x1="0"
        x2="0"
        y1="0"
        y2={`${svgHeight}px`}
        gradientUnits="userSpaceOnUse"
      >
        <stop offset={off} stopColor={green} stopOpacity={1} />
        <stop offset={off} stopColor={red} stopOpacity={1} />
      </linearGradient>
    </defs>
  );
}

const Chart = ({ networth }: { networth: { date: Date; value: number }[] }) => {
  const dateFormatter = (date: Date) =>
    date.toLocaleDateString("default", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
    });

  return (
    <LineChart
      height={500}
      dataset={networth}
      series={[
        { dataKey: "value", area: true, color: "black", curve: "stepAfter" },
      ]}
      axisHighlight={{
        y: "line",
        x: "line",
      }}
      xAxis={[
        {
          dataKey: "date",
          scaleType: "time",
          valueFormatter: dateFormatter,
        },
      ]}
      yAxis={[
        {
          valueFormatter: (value: number) =>
            value.toLocaleString("default", {
              style: "currency",
              currency: "RUB",
            }),
        },
      ]}
      margin={{
        left: 100,
      }}
      sx={{
        "& .MuiAreaElement-root": {
          fill: "url(#switch-color)",
        },
      }}
    >
      <ColorSwich />
      {/* <rect x={0} y={0} width={5} height="100%" fill="url(#swich-color-id-1)" /> */}
    </LineChart>
  );
};

export default Chart;
