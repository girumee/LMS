import { useState, useEffect } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const { Item } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
    console.log(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}>
        <Link href="/" legacyBehavior>
          <a className="r-under">Home</a>
        </Link>
      </Item>

      <Item
        key="/login"
        onClick={(e) => setCurrent(e.key)}
        icon={<LoginOutlined />}>
        <Link href="/login" legacyBehavior>
          <a className="r-under">Login</a>
        </Link>
      </Item>

      <Item
        key="/register"
        onClick={(e) => setCurrent(e.key)}
        icon={<UserAddOutlined />}>
        <Link href="/register" legacyBehavior>
          <a className="r-under">Register</a>
        </Link>
      </Item>
    </Menu>
  );
};

export default TopNav;
