import { useState } from "react";
import { Tabs, Dropdown, Toggle, Slider, DropdownProps } from "blox-ui-react";

// Sample data for the analytics dashboard
const METRICS = {
  daily: {
    users: [120, 145, 165, 155, 170, 180, 190],
    sessions: [210, 245, 265, 255, 270, 290, 310],
    pageViews: [580, 620, 640, 630, 660, 680, 710],
    bounceRate: [45, 42, 38, 40, 38, 36, 35],
    conversionRate: [2.8, 3.2, 3.4, 3.5, 3.7, 3.8, 4.1],
  },
  weekly: {
    users: [890, 920, 950, 980],
    sessions: [1450, 1520, 1580, 1640],
    pageViews: [4100, 4250, 4400, 4550],
    bounceRate: [41, 40, 38, 37],
    conversionRate: [3.2, 3.5, 3.7, 3.9],
  },
  monthly: {
    users: [3800, 4200, 4500, 4800, 5100, 5400],
    sessions: [6200, 6800, 7200, 7600, 8000, 8400],
    pageViews: [18500, 19800, 21000, 22200, 23400, 24600],
    bounceRate: [43, 42, 40, 39, 38, 36],
    conversionRate: [2.9, 3.1, 3.3, 3.5, 3.7, 3.9],
  },
};

const TIME_LABELS = {
  daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
  monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
};

const SOURCES = [
  { name: "Direct", value: 35, color: "#3b82f6" },
  { name: "Organic Search", value: 25, color: "#10b981" },
  { name: "Social Media", value: 20, color: "#8b5cf6" },
  { name: "Referral", value: 12, color: "#f59e0b" },
  { name: "Email", value: 8, color: "#ef4444" },
];

const DEVICES = [
  { name: "Desktop", value: 55, color: "#3b82f6" },
  { name: "Mobile", value: 38, color: "#10b981" },
  { name: "Tablet", value: 7, color: "#8b5cf6" },
];

const TOP_PAGES = [
  { path: "/home", views: 12580, bounceRate: 32, conversionRate: 4.2 },
  { path: "/products", views: 8940, bounceRate: 38, conversionRate: 3.8 },
  { path: "/blog/top-tips", views: 6720, bounceRate: 42, conversionRate: 2.9 },
  { path: "/about-us", views: 4320, bounceRate: 45, conversionRate: 1.5 },
  { path: "/contact", views: 3860, bounceRate: 36, conversionRate: 5.2 },
];

function Analytics() {
  const [timeRange, setTimeRange] = useState("daily");
  const [showRealTime, setShowRealTime] = useState(false);
  const [dateRange, setDateRange] = useState("This Week");
  const [compareMode, setCompareMode] = useState(false);

  // Draw a simple bar chart
  const BarChart = ({ data, labels, color, height = 200, maxValue = null }) => {
    const max = maxValue || Math.max(...data) * 1.2;

    return (
      <div
        className="h-full flex items-end"
        style={{ height }}>
        {data.map((value, index) => (
          <div
            key={index}
            className="flex flex-col items-center flex-1">
            <div
              className="w-full mx-1 rounded-t"
              style={{
                height: `${(value / max) * 100}%`,
                backgroundColor: color || "#3b82f6",
              }}
            />
            <div className="text-xs mt-1 text-gray-500">{labels[index]}</div>
          </div>
        ))}
      </div>
    );
  };

  // Draw a simple line chart
  const LineChart = ({ data, labels, color, height = 200, maxValue = null }) => {
    const max = maxValue || Math.max(...data) * 1.2;
    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = 100 - (value / max) * 100;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <div
        className="relative"
        style={{ height }}>
        <svg
          width="100%"
          height="100%"
          className="overflow-visible">
          <polyline
            points={points}
            fill="none"
            stroke={color || "#3b82f6"}
            strokeWidth="2"
            className="drop-shadow"
          />
          {data.map((value, index) => {
            const x = (index / (data.length - 1)) * 100;
            const y = 100 - (value / max) * 100;
            return (
              <circle
                key={index}
                cx={`${x}%`}
                cy={`${y}%`}
                r="4"
                fill={color || "#3b82f6"}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
        </svg>
        <div className="absolute bottom-0 left-0 right-0 flex justify-between">
          {labels.map((label, index) => (
            <div
              key={index}
              className="text-xs text-gray-500">
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Draw a simple pie chart
  const PieChart = ({ data, height = 200 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    let startAngle = 0;

    return (
      <div
        className="relative"
        style={{ height }}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100">
          {data.map((item, index) => {
            const percentage = (item.value / total) * 100;
            const angle = (percentage / 100) * 360;
            const endAngle = startAngle + angle;

            // Calculate the SVG arc path
            const x1 = 50 + 40 * Math.cos((startAngle * Math.PI) / 180);
            const y1 = 50 + 40 * Math.sin((startAngle * Math.PI) / 180);
            const x2 = 50 + 40 * Math.cos((endAngle * Math.PI) / 180);
            const y2 = 50 + 40 * Math.sin((endAngle * Math.PI) / 180);

            const largeArcFlag = angle > 180 ? 1 : 0;
            const pathData = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            const result = (
              <path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth="1"
              />
            );

            startAngle = endAngle;
            return result;
          })}
        </svg>
      </div>
    );
  };

  // Draw a legend for pie/donut charts
  const ChartLegend = ({ data }) => (
    <div className="mt-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center mb-2">
          <div
            className="w-4 h-4 mr-2 rounded-sm"
            style={{ backgroundColor: item.color }}
          />
          <div className="text-sm">{item.name}</div>
          <div className="ml-auto text-sm font-medium">{item.value}%</div>
        </div>
      ))}
    </div>
  );

  // Format numbers for display
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Analytics Dashboard</h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Real-time</span>
            <Toggle
              pressed={showRealTime}
              onChange={setShowRealTime}
              className={`p-0.5 w-12 h-6 rounded-full transition-colors ${showRealTime ? "bg-blue-600" : "bg-gray-300"}`}>
              <span className={`block w-5 h-5 rounded-full bg-white transform transition-transform ${showRealTime ? "translate-x-6" : "translate-x-0"}`}></span>
            </Toggle>
          </div>

          <Dropdown>
            <Dropdown.Trigger className=" min-w-[240px] px-3 py-2 border border-gray-300 rounded-md text-sm inline flex justify-between">
              <span>{dateRange}</span>
              <span>▼</span>
            </Dropdown.Trigger>

            <Dropdown.Menu className=" min-w-[240px] rounded-md shadow-lg py-1 bg-white border border-gray-200">
              <Dropdown.Item
                value=""
                className="px-4 py-2 text-sm hover:bg-gray-100"
                onSelect={() => setDateRange("Today")}>
                Today
              </Dropdown.Item>
              <Dropdown.Item
                value=""
                className="px-4 py-2 text-sm hover:bg-gray-100"
                onSelect={() => setDateRange("This Week")}>
                This Week
              </Dropdown.Item>
              <Dropdown.Item
                value=""
                className="px-4 py-2 text-sm hover:bg-gray-100"
                onSelect={() => setDateRange("This Month")}>
                This Month
              </Dropdown.Item>
              <Dropdown.Item
                value=""
                className="px-4 py-2 text-sm hover:bg-gray-100"
                onSelect={() => setDateRange("This Quarter")}>
                This Quarter
              </Dropdown.Item>
              <Dropdown.Item
                value=""
                className="px-4 py-2 text-sm hover:bg-gray-100"
                onSelect={() => setDateRange("This Year")}>
                This Year
              </Dropdown.Item>
              <Dropdown.Item
                value=""
                className="px-4 py-2 text-sm hover:bg-gray-100"
                onSelect={() => setDateRange("Custom Range")}>
                Custom Range
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Compare</span>
            <Toggle
              pressed={compareMode}
              onChange={setCompareMode}
              className={`p-0.5 w-12 h-6 rounded-full transition-colors ${compareMode ? "bg-blue-600" : "bg-gray-300"}`}>
              <span className={`block w-5 h-5 rounded-full bg-white transform transition-transform ${compareMode ? "translate-x-6" : "translate-x-0"}`}></span>
            </Toggle>
          </div>
        </div>
      </div>

      {/* Time Range Tabs */}
      <div className="mb-6">
        <Toggle.Group
          type="single"
          orientation="horizontal"
          spacing="none"
          value={timeRange}
          onChange={setTimeRange}
          className="flex w-full max-w-md">
          <Toggle
            value="daily"
            className={`flex-1 border py-2 text-center text-sm rounded-l-lg border-radius-2 ${timeRange === "daily" ? "bg-blue-700 text-blue-100 border-blue-900" : "bg-gray-100"}`}>
            Daily
          </Toggle>
          <Toggle
            value="weekly"
            className={`flex-1 border py-2 text-center text-sm border-x-0 ${timeRange === "weekly" ? "bg-blue-700 text-blue-100 border-blue-900" : "bg-gray-100"}`}>
            Weekly
          </Toggle>
          <Toggle
            value="monthly"
            className={`flex-1 border py-2 text-center text-sm rounded-r-lg border-radius-2 ${timeRange === "monthly" ? "bg-blue-700 text-blue-100 border-blue-900" : "bg-gray-100"}`}>
            Monthly
          </Toggle>
        </Toggle.Group>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {[
          { title: "Users", value: METRICS[timeRange].users.slice(-1)[0], prevValue: METRICS[timeRange].users.slice(-2)[0], icon: "👤" },
          { title: "Sessions", value: METRICS[timeRange].sessions.slice(-1)[0], prevValue: METRICS[timeRange].sessions.slice(-2)[0], icon: "🔄" },
          { title: "Page Views", value: METRICS[timeRange].pageViews.slice(-1)[0], prevValue: METRICS[timeRange].pageViews.slice(-2)[0], icon: "👁️" },
          { title: "Bounce Rate", value: METRICS[timeRange].bounceRate.slice(-1)[0], prevValue: METRICS[timeRange].bounceRate.slice(-2)[0], icon: "↩️", unit: "%" },
          { title: "Conversion", value: METRICS[timeRange].conversionRate.slice(-1)[0], prevValue: METRICS[timeRange].conversionRate.slice(-2)[0], icon: "🎯", unit: "%" },
        ].map((metric, index) => {
          const change = metric.value - metric.prevValue;
          const changePercent = ((change / metric.prevValue) * 100).toFixed(1);
          const isPositive = change >= 0;
          const isNegative = !isPositive;
          const isPositiveGood = metric.title !== "Bounce Rate";

          return (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="text-2xl">{metric.icon}</div>
                <div className="text-gray-500 text-sm ml-2">{metric.title}</div>
              </div>
              <div className="mt-2 text-2xl font-semibold">
                {formatNumber(metric.value)}
                {metric.unit}
              </div>
              <div className={`mt-1 text-xs ${(isPositive && isPositiveGood) || (isNegative && !isPositiveGood) ? "text-green-600" : "text-red-600"}`}>
                {isPositive ? "↑" : "↓"} {Math.abs(changePercent)}%
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-6">
        {/* Traffic Trends Chart */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Traffic Trends</h3>
            <Dropdown width="50%">
              <Dropdown.Trigger className="w-full  text-sm text-gray-500 inline-flex justify-between gap-4">
                <span>Users</span>
                <span> ▼</span>
              </Dropdown.Trigger>

              <Dropdown.Menu className="w-40 rounded-md shadow-lg py-1 bg-white border border-gray-200">
                <Dropdown.Item
                  value="users"
                  className="px-4 py-2 text-sm hover:bg-gray-100">
                  Users
                </Dropdown.Item>
                <Dropdown.Item
                  value="sessions"
                  className="px-4 py-2 text-sm hover:bg-gray-100">
                  Sessions
                </Dropdown.Item>
                <Dropdown.Item
                  value="pageViews"
                  className="px-4 py-2 text-sm hover:bg-gray-100">
                  Page Views
                </Dropdown.Item>
                <Dropdown.Item
                  value="bounceRate"
                  className="px-4 py-2 text-sm hover:bg-gray-100">
                  Bounce Rate
                </Dropdown.Item>
                <Dropdown.Item
                  value="conversionRate"
                  className="px-4 py-2 text-sm hover:bg-gray-100">
                  Conversion Rate
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="h-64">
            <LineChart
              data={METRICS[timeRange].users}
              labels={TIME_LABELS[timeRange]}
              color="#3b82f6"
              height={250}
            />
          </div>
        </div>

        {/* Traffic Sources Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium mb-4">Traffic Sources</h3>
          <div className="h-48">
            <PieChart
              data={SOURCES}
              height={180}
            />
          </div>
          <ChartLegend data={SOURCES} />
        </div>

        {/* Devices Chart */}
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium mb-4">Devices</h3>
          <div className="h-48">
            <PieChart
              data={DEVICES}
              height={180}
            />
          </div>
          <ChartLegend data={DEVICES} />
        </div>

        {/* Top Pages Table */}
        <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h3 className="font-medium mb-4">Top Pages</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Page</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bounce Rate</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Conversion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {TOP_PAGES.map((page, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 text-sm">{page.path}</td>
                    <td className="px-4 py-3 text-sm">{formatNumber(page.views)}</td>
                    <td className="px-4 py-3 text-sm">{page.bounceRate}%</td>
                    <td className="px-4 py-3 text-sm">{page.conversionRate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
