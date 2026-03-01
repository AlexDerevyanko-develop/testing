import React from "react";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import {
  Layout as AntLayout,
  Menu,
  Avatar,
  Badge,
  Dropdown,
  Button,
} from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import type { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import styles from "./Layout.module.scss";

const { Sider, Header, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: "/",
      icon: <DashboardOutlined />,
      label: "Dashboard",
    },
    {
      key: "/profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
  ];

  const dropdownItems = {
    items: [
      {
        key: "profile",
        icon: <UserOutlined />,
        label: "Profile",
        onClick: () => navigate({ to: "/profile" }),
      },
      {
        key: "settings",
        icon: <SettingOutlined />,
        label: "Settings",
      },
      { type: "divider" as const },
      {
        key: "logout",
        icon: <LogoutOutlined />,
        label: "Logout",
        danger: true,
        onClick: () => dispatch(logout()),
      },
    ],
  };

  return (
    <AntLayout className={styles.appLayout}>
      <Sider
        collapsible
        collapsed={collapsed}
        trigger={null}
        className={styles.sidebar}
        width={240}
      >
        <div className={styles.logo}>{collapsed ? "⚡" : "⚡ Auto"}</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["/"]}
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={({ key }) => navigate({ to: key as "/" | "/profile" })}
        />
      </Sider>

      <AntLayout>
        <Header className={styles.header}>
          <div className="flex items-center gap-4">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="text-white text-xl"
            />
            <span className="text-white font-semibold text-lg hidden md:block">
              Welcome back, {user?.name?.split(" ")[0] ?? "User"}!
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Badge count={3} size="small">
              <Button
                type="text"
                icon={<BellOutlined />}
                className="text-white text-xl"
              />
            </Badge>

            <Dropdown menu={dropdownItems} placement="bottomRight" arrow>
              <div className="flex items-center gap-2 cursor-pointer">
                <Avatar
                  size={36}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                >
                  {user?.name?.[0] ?? "U"}
                </Avatar>
                <span className="text-white font-medium hidden md:block">
                  {user?.name}
                </span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className={styles.content}>{children}</Content>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
