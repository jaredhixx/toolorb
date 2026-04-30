import type {
  ToolChartData,
  ToolChartDatum,
  ToolResultValue,
} from "../../lib/tools/tool-types";
import {
  formatCurrency,
  formatNumber,
  formatPercent,
} from "../../lib/tools/tool-formatters";

type ToolChartProps = {
  title?: string;
  data: ToolChartData;
};

const chartColors = [
  "#d6a84f",
  "#8fb4ff",
  "#77d996",
  "#c38cff",
  "#f28b82",
  "#f6c177",
];

function formatChartValue(
  value: number,
  valueFormat: ToolChartData["valueFormat"],
): string {
  if (valueFormat === "percent") {
    return formatPercent(value);
  }

  if (valueFormat === "number") {
    return formatNumber(value);
  }

  if (valueFormat === "text") {
    return String(value);
  }

  return formatCurrency(value);
}

function formatDisplayValue(
  value: ToolResultValue,
  valueFormat: ToolChartData["valueFormat"],
): string {
  if (typeof value === "object") {
    return `${formatDisplayValue(
      value.value,
      value.valueFormat ?? valueFormat,
    )}${value.suffix ?? ""}`;
  }

  if (typeof value === "string") {
    return value;
  }

  return formatChartValue(value, valueFormat);
}

function buildPieSegments(items: ToolChartDatum[]) {
  const total = items.reduce((sum, item) => sum + Math.max(item.value, 0), 0);

  if (total <= 0) {
    return "conic-gradient(#44403c 0deg 360deg)";
  }

  let currentDegree = 0;

  const segments = items.map((item, index) => {
    const safeValue = Math.max(item.value, 0);
    const degrees = (safeValue / total) * 360;
    const startDegree = currentDegree;
    const endDegree = currentDegree + degrees;

    currentDegree = endDegree;

    return `${chartColors[index % chartColors.length]} ${startDegree}deg ${endDegree}deg`;
  });

  return `conic-gradient(${segments.join(", ")})`;
}

export default function ToolChart({ title, data }: ToolChartProps) {
  const chartTitle = title ?? data.title;
  const valueFormat = data.valueFormat ?? "currency";
  const chartItems = data.items ?? [];
  const chartSeries = data.series ?? [];

  if ((data.type === "bar" || data.type === "pie") && chartItems.length === 0) {
    return null;
  }

  if (data.type === "line" && chartSeries.length === 0) {
    return null;
  }

  if (data.type === "bar") {
    const maxValue = Math.max(...chartItems.map((item) => item.value));

    return (
      <div className="mt-6 rounded-2xl border border-stone-800 bg-stone-950/70 p-5">
        {chartTitle && (
          <p className="text-sm font-medium text-stone-200">{chartTitle}</p>
        )}

        <div className="mt-4 space-y-4">
          {chartItems.map((item) => {
            const width = maxValue > 0 ? (item.value / maxValue) * 100 : 0;

            return (
              <div key={item.label}>
                <div className="flex items-center justify-between gap-4 text-sm text-stone-300">
                  <span>{item.label}</span>
                  <span>{formatChartValue(item.value, valueFormat)}</span>
                </div>

                <div className="mt-1 h-2 w-full rounded-full bg-stone-800">
                  <div
                    className="h-2 rounded-full bg-amber-400"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (data.type === "pie") {
    const total = chartItems.reduce(
      (sum, item) => sum + Math.max(item.value, 0),
      0,
    );

    return (
      <div className="mt-6 rounded-3xl border border-stone-800 bg-stone-950/70 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <div>
          {chartTitle && (
            <p className="text-sm font-semibold text-stone-100">
              {chartTitle}
            </p>
          )}

          {data.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-400">
              {data.description}
            </p>
          )}
        </div>

        <div className="mt-6 space-y-6">
          <div className="relative mx-auto flex h-56 w-56 items-center justify-center">
            <div
              className="absolute inset-0 rounded-full shadow-[inset_0_0_24px_rgba(0,0,0,0.45)]"
              style={{ background: buildPieSegments(chartItems) }}
              aria-hidden="true"
            />

            <div className="absolute inset-8 rounded-full border border-stone-800 bg-stone-950 shadow-[0_0_36px_rgba(0,0,0,0.45)]" />

            <div className="relative z-10 px-5 text-center">
              {data.centerValue && (
                <p className="text-2xl font-semibold tracking-tight text-stone-50">
                  {formatDisplayValue(
                    data.centerValue,
                    data.centerValueFormat ?? valueFormat,
                  )}
                </p>
              )}

              {data.centerLabel && (
                <p className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-stone-500">
                  {data.centerLabel}
                </p>
              )}

              {data.centerHelperText && (
                <p className="mt-1 text-xs text-stone-400">
                  {data.centerHelperText}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            {chartItems.map((item, index) => {
              const safeValue = Math.max(item.value, 0);
              const percentage =
                total > 0 ? Math.round((safeValue / total) * 100) : 0;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-stone-800/80 bg-stone-900/35 px-4 py-3"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />
                      <span className="truncate text-sm font-medium text-stone-200">
                        {item.label}
                      </span>
                    </div>

                    <span className="shrink-0 text-sm font-semibold text-stone-100">
                      {formatChartValue(item.value, valueFormat)}
                    </span>
                  </div>

                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-stone-800">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor:
                            chartColors[index % chartColors.length],
                        }}
                      />
                    </div>

                    <span className="w-10 text-right text-xs text-stone-500">
                      {percentage}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (data.type === "line") {
    const allPoints = chartSeries.flatMap((series) => series.points);
    const maxValue = Math.max(...allPoints.map((point) => point.value));
    const minValue = Math.min(...allPoints.map((point) => point.value));
    const valueRange = maxValue - minValue || 1;
    const chartWidth = 320;
    const chartHeight = 150;
    const chartPadding = 12;

    function getPointX(pointIndex: number, totalPoints: number) {
      if (totalPoints <= 1) {
        return chartPadding;
      }

      return (
        chartPadding +
        (pointIndex / (totalPoints - 1)) * (chartWidth - chartPadding * 2)
      );
    }

    function getPointY(value: number) {
      return (
        chartPadding +
        ((maxValue - value) / valueRange) * (chartHeight - chartPadding * 2)
      );
    }

    return (
      <div className="mt-6 rounded-3xl border border-stone-800 bg-stone-950/70 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <div>
          {chartTitle && (
            <p className="text-sm font-semibold text-stone-100">
              {chartTitle}
            </p>
          )}

          {data.description && (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-400">
              {data.description}
            </p>
          )}
        </div>

        <div className="mt-6 space-y-5">
          {chartSeries.map((series, seriesIndex) => {
            const color = chartColors[seriesIndex % chartColors.length];

            const pathData = series.points
              .map((point, pointIndex) => {
                const x = getPointX(pointIndex, series.points.length);
                const y = getPointY(point.value);

                return `${pointIndex === 0 ? "M" : "L"} ${x} ${y}`;
              })
              .join(" ");

            return (
              <div key={series.label}>
                <div className="mb-3 flex items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    <span className="font-medium text-stone-200">
                      {series.label}
                    </span>
                  </div>

                  <span className="text-stone-400">
                    {formatChartValue(
                      series.points[series.points.length - 1]?.value ?? 0,
                      valueFormat,
                    )}
                  </span>
                </div>

                <div className="relative overflow-hidden rounded-2xl border border-stone-800/80 bg-stone-900/35 p-4">
                  <svg
                    viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                    className="h-40 w-full overflow-visible"
                    role="img"
                    aria-label={`${series.label} chart`}
                  >
                    <line
                      x1={chartPadding}
                      y1={chartHeight / 2}
                      x2={chartWidth - chartPadding}
                      y2={chartHeight / 2}
                      stroke="#292524"
                      strokeWidth="1"
                    />

                    <path
                      d={pathData}
                      fill="none"
                      stroke={color}
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {series.points.map((point, pointIndex) => {
                      const x = getPointX(pointIndex, series.points.length);
                      const y = getPointY(point.value);

                      return (
                        <circle
                          key={`${point.label}-${pointIndex}`}
                          cx={x}
                          cy={y}
                          r="4"
                          fill="#0c0a09"
                          stroke={color}
                          strokeWidth="3"
                        />
                      );
                    })}
                  </svg>

                  <div className="mt-3 flex justify-between text-xs text-stone-500">
                    <span>{series.points[0]?.label}</span>
                    <span>
                      {series.points[series.points.length - 1]?.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}
