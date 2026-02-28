import React from "react";
import { Card, Row, Col, Statistic, Tag, Table, Progress } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import styles from "./DashboardPage.module.scss";

const areaData = [
  { month: "Jan", revenue: 4200, users: 240 },
  { month: "Feb", revenue: 5800, users: 310 },
  { month: "Mar", revenue: 5200, users: 280 },
  { month: "Apr", revenue: 7100, users: 420 },
  { month: "May", revenue: 6400, users: 380 },
  { month: "Jun", revenue: 8900, users: 530 },
  { month: "Jul", revenue: 9200, users: 610 },
  { month: "Aug", revenue: 8100, users: 570 },
  { month: "Sep", revenue: 10500, users: 720 },
  { month: "Oct", revenue: 11200, users: 800 },
  { month: "Nov", revenue: 9800, users: 680 },
  { month: "Dec", revenue: 13400, users: 950 },
];

const barData = [
  { day: "Mon", sales: 120 },
  { day: "Tue", sales: 85 },
  { day: "Wed", sales: 175 },
  { day: "Thu", sales: 142 },
  { day: "Fri", sales: 210 },
  { day: "Sat", sales: 95 },
  { day: "Sun", sales: 60 },
];

const pieData = [
  { name: "Electronics", value: 38 },
  { name: "Clothing", value: 24 },
  { name: "Books", value: 18 },
  { name: "Sports", value: 12 },
  { name: "Other", value: 8 },
];

const PIE_COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"];

const tableData = [
  {
    key: "1",
    name: 'MacBook Pro 16"',
    category: "Electronics",
    sales: 142,
    revenue: "$284,000",
    status: "active",
  },
  {
    key: "2",
    name: "Nike Air Max 90",
    category: "Clothing",
    sales: 318,
    revenue: "$47,700",
    status: "active",
  },
  {
    key: "3",
    name: "Clean Code Book",
    category: "Books",
    sales: 95,
    revenue: "$2,850",
    status: "low",
  },
  {
    key: "4",
    name: "Yoga Mat Pro",
    category: "Sports",
    sales: 204,
    revenue: "$15,300",
    status: "active",
  },
  {
    key: "5",
    name: "AirPods Pro 2",
    category: "Electronics",
    sales: 87,
    revenue: "$21,750",
    status: "low",
  },
];

const columns = [
  {
    title: "Product",
    dataIndex: "name",
    key: "name",
    render: (text: string) => <span className="font-medium">{text}</span>,
  },
  { title: "Category", dataIndex: "category", key: "category" },
  { title: "Sales", dataIndex: "sales", key: "sales" },
  {
    title: "Revenue",
    dataIndex: "revenue",
    key: "revenue",
    render: (text: string) => (
      <span className="text-green-600 font-semibold">{text}</span>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => (
      <Tag
        color={status === "active" ? "success" : "warning"}
        className="rounded-full"
      >
        {status === "active" ? "In Stock" : "Low Stock"}
      </Tag>
    ),
  },
];

const goals = [
  {
    label: "Monthly Revenue",
    current: 85400,
    target: 100000,
    color: "#6366f1",
  },
  { label: "New Users", current: 782, target: 1000, color: "#8b5cf6" },
  { label: "Orders Fulfilled", current: 94, target: 100, color: "#10b981" },
];

const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          Welcome to your analytics panel. Here's what's happening.
        </p>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        {[
          {
            title: "Total Revenue",
            value: 85400,
            prefix: "$",
            icon: <DollarOutlined />,
            color: "#6366f1",
            trend: 12.5,
          },
          {
            title: "Total Users",
            value: 18420,
            prefix: "",
            icon: <UserOutlined />,
            color: "#8b5cf6",
            trend: 8.2,
          },
          {
            title: "Total Orders",
            value: 3240,
            prefix: "",
            icon: <ShoppingCartOutlined />,
            color: "#ec4899",
            trend: -2.4,
          },
          {
            title: "Page Views",
            value: 124500,
            prefix: "",
            icon: <EyeOutlined />,
            color: "#f59e0b",
            trend: 18.9,
          },
        ].map(stat => (
          <Col xs={24} sm={12} xl={6} key={stat.title}>
            <Card className={styles.statCard} bordered={false}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-gray-500 text-sm mb-1">{stat.title}</p>
                  <Statistic
                    value={stat.value}
                    prefix={stat.prefix}
                    valueStyle={{
                      fontSize: "1.75rem",
                      fontWeight: 700,
                      color: "#1a1a2e",
                    }}
                  />
                  <span
                    className={`text-sm font-medium ${stat.trend > 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    {stat.trend > 0 ? (
                      <ArrowUpOutlined />
                    ) : (
                      <ArrowDownOutlined />
                    )}{" "}
                    {Math.abs(stat.trend)}% vs last month
                  </span>
                </div>
                <div
                  className={styles.iconBox}
                  style={{ background: `${stat.color}20`, color: stat.color }}
                >
                  {React.cloneElement(stat.icon, { style: { fontSize: 24 } })}
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={16}>
          <Card
            title={
              <span className="font-semibold text-gray-700">
                Revenue & Users Trend
              </span>
            }
            bordered={false}
            className={styles.chartCard}
          >
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={areaData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                  name="Revenue ($)"
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                  name="Users"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title={
              <span className="font-semibold text-gray-700">
                Category Distribution
              </span>
            }
            bordered={false}
            className={styles.chartCard}
          >
            <ResponsiveContainer width="100%" height={280}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={PIE_COLORS[index % PIE_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={val => `${val}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Bar Chart + Goals */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} lg={14}>
          <Card
            title={
              <span className="font-semibold text-gray-700">Weekly Sales</span>
            }
            bordered={false}
            className={styles.chartCard}
          >
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="sales" name="Sales" radius={[6, 6, 0, 0]}>
                  {barData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={index === 4 ? "#6366f1" : "#a5b4fc"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        <Col xs={24} lg={10}>
          <Card
            title={
              <span className="font-semibold text-gray-700">Monthly Goals</span>
            }
            bordered={false}
            className={styles.chartCard}
            style={{ height: "100%" }}
          >
            <div className="flex flex-col gap-5 pt-2">
              {goals.map(goal => (
                <div key={goal.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">{goal.label}</span>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: goal.color }}
                    >
                      {Math.round((goal.current / goal.target) * 100)}%
                    </span>
                  </div>
                  <Progress
                    percent={Math.round((goal.current / goal.target) * 100)}
                    strokeColor={goal.color}
                    trailColor="#f0f0f0"
                    showInfo={false}
                    strokeLinecap="round"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {typeof goal.current === "number" && goal.current > 1000
                      ? `$${goal.current.toLocaleString()}`
                      : goal.current}{" "}
                    /{" "}
                    {typeof goal.target === "number" && goal.target >= 1000
                      ? `$${goal.target.toLocaleString()}`
                      : goal.target}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Table */}
      <Card
        title={
          <span className="font-semibold text-gray-700">Top Products</span>
        }
        bordered={false}
        className={styles.chartCard}
      >
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false}
          className={styles.table}
          rowHoverable
        />
      </Card>
    </div>
  );
};

export default DashboardPage;
