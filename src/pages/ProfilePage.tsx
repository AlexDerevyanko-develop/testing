import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Avatar,
  Tag,
  Descriptions,
  Button,
  Timeline,
  Divider,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
  EditOutlined,
  LockOutlined,
  CheckCircleOutlined,
  StarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip as ReTooltip,
} from "recharts";
import type { RootState } from "../store/store";
import styles from "./ProfilePage.module.scss";

const skills = [
  { subject: "Analytics", A: 92 },
  { subject: "Marketing", A: 78 },
  { subject: "Development", A: 85 },
  { subject: "Design", A: 70 },
  { subject: "Management", A: 88 },
  { subject: "Strategy", A: 95 },
];

const timeline = [
  {
    label: "Logged In",
    desc: "Session started successfully",
    color: "green",
    icon: <CheckCircleOutlined />,
  },
  {
    label: "Dashboard Viewed",
    desc: "Checked monthly analytics",
    color: "blue",
    icon: <StarOutlined />,
  },
  {
    label: "Report Generated",
    desc: "Q4 Revenue Report exported",
    color: "purple",
    icon: <TrophyOutlined />,
  },
  {
    label: "Settings Updated",
    desc: "Notification preferences saved",
    color: "orange",
    icon: <EditOutlined />,
  },
];

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const formatDate = (unix?: number) => {
    if (!unix) return "—";
    return new Date(unix * 1000).toLocaleString();
  };

  const tokenPreview = token ? `${token.substring(0, 32)}...` : "—";

  return (
    <div className={styles.profile}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-1">My Profile</h1>
        <p className="text-gray-500">
          Manage your account details and view session info.
        </p>
      </div>

      <Row gutter={[16, 16]}>
        {/* Profile Card */}
        <Col xs={24} lg={8}>
          <Card bordered={false} className={styles.profileCard}>
            <div className={styles.coverBg} />
            <div className={styles.avatarSection}>
              <Avatar
                size={96}
                className={styles.avatar}
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <span className="text-3xl font-bold">
                  {user?.name?.[0] ?? "U"}
                </span>
              </Avatar>
              <h2 className="text-xl font-bold text-gray-800 mt-3">
                {user?.name ?? "Unknown User"}
              </h2>
              <p className="text-gray-500 text-sm">{user?.email ?? "—"}</p>
              <Tag
                color="purple"
                className="mt-2 rounded-full px-3 py-0.5 text-sm font-medium"
                icon={<SafetyCertificateOutlined />}
              >
                {user?.role ?? "User"}
              </Tag>
            </div>

            <Divider />

            <div className="flex justify-around text-center">
              {[
                { label: "Projects", value: 24 },
                { label: "Reports", value: 138 },
                { label: "Tasks", value: 9 },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-indigo-600">{value}</p>
                  <p className="text-xs text-gray-400">{label}</p>
                </div>
              ))}
            </div>

            <Divider />

            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<EditOutlined />}
                block
                style={{
                  background: "linear-gradient(90deg, #6366f1, #8b5cf6)",
                  border: "none",
                }}
              >
                Edit Profile
              </Button>
              <Button icon={<LockOutlined />} block>
                Security
              </Button>
            </div>
          </Card>
        </Col>

        {/* Details & JWT */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            {/* Account Info */}
            <Col xs={24}>
              <Card
                title={
                  <span className="font-semibold text-gray-700">
                    <UserOutlined className="mr-2" />
                    Account Information
                  </span>
                }
                bordered={false}
                className={styles.infoCard}
              >
                <Descriptions
                  column={{ xs: 1, sm: 2 }}
                  labelStyle={{ fontWeight: 600, color: "#6b7280", width: 130 }}
                >
                  <Descriptions.Item
                    label={
                      <>
                        <UserOutlined /> Name
                      </>
                    }
                  >
                    {user?.name ?? "—"}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <MailOutlined /> Email
                      </>
                    }
                  >
                    {user?.email ?? "—"}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <SafetyCertificateOutlined /> Role
                      </>
                    }
                  >
                    <Tag color="geekblue">{user?.role ?? "—"}</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="User ID">
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-sm text-indigo-600">
                      {user?.sub ?? "—"}
                    </code>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>

            {/* JWT Info */}
            <Col xs={24}>
              <Card
                title={
                  <span className="font-semibold text-gray-700">
                    <LockOutlined className="mr-2" />
                    JWT Token Info
                  </span>
                }
                bordered={false}
                className={styles.infoCard}
              >
                <Descriptions
                  column={{ xs: 1, sm: 2 }}
                  labelStyle={{ fontWeight: 600, color: "#6b7280", width: 130 }}
                >
                  <Descriptions.Item
                    label={
                      <>
                        <ClockCircleOutlined /> Issued At
                      </>
                    }
                  >
                    {formatDate(user?.iat)}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <ClockCircleOutlined /> Expires At
                      </>
                    }
                  >
                    {formatDate(user?.exp)}
                  </Descriptions.Item>
                  <Descriptions.Item label="Token" span={2}>
                    <Tooltip title={token ?? ""} placement="topLeft">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded block truncate text-green-600 cursor-pointer">
                        {tokenPreview}
                      </code>
                    </Tooltip>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Radar Chart */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <span className="font-semibold text-gray-700">
                <TrophyOutlined className="mr-2" />
                Skills Radar
              </span>
            }
            bordered={false}
            className={styles.infoCard}
          >
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={skills}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#6b7280", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  domain={[0, 100]}
                  tick={{ fill: "#9ca3af", fontSize: 10 }}
                />
                <Radar
                  name={user?.name ?? "User"}
                  dataKey="A"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <ReTooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>
        </Col>

        {/* Recent Activity */}
        <Col xs={24} lg={12}>
          <Card
            title={
              <span className="font-semibold text-gray-700">
                <ClockCircleOutlined className="mr-2" />
                Recent Activity
              </span>
            }
            bordered={false}
            className={styles.infoCard}
          >
            <Timeline
              className="pt-2"
              items={timeline.map(item => ({
                color: item.color,
                dot: item.icon,
                children: (
                  <div>
                    <p className="font-semibold text-gray-700 text-sm">
                      {item.label}
                    </p>
                    <p className="text-gray-400 text-xs">{item.desc}</p>
                  </div>
                ),
              }))}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
