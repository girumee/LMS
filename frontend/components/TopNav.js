import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  UserOutlined,
  DashboardOutlined,
  HomeFilled,
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Context } from "../context/index";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, SubMenu, ItemGroup } = Menu;

const TopNav = () => {
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    process.browser && setCurrent(window.location.pathname);
  }, [process.browser && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const { data } = await axios.get("/api/logout");
    toast(data.message);
    router.push("/login")
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item key="/" onClick={(e) => setCurrent(e.key)} icon={<HomeOutlined />}>
        <Link href="/" legacyBehavior>
          <a className="r-under">Home</a>
        </Link>
      </Item>
      {user === null && (
        <SubMenu
          icon={<AppstoreOutlined />}
          title="Account"
          style={{ marginLeft: "auto" }}>
          <>
            <Item
              key="/login"
              onClick={(e) => setCurrent(e.key)}
              icon={<LoginOutlined />}
              style={{ marginLeft: "auto" }}>
              <Link href="/login" legacyBehavior>
                <a className="r-under">Login</a>
              </Link>
            </Item>

            <Item
              key="/register"
              onClick={(e) => setCurrent(e.key)}
              icon={<UserAddOutlined />}
              style={{ marginLeft: "0.5px" }}>
              <Link href="/register" legacyBehavior>
                <a className="r-under">Register</a>
              </Link>
            </Item>
          </>
        </SubMenu>
      )}
      {user !== null && (
        <SubMenu
          icon={<UserOutlined />}
          title={user && user.firstname}
          style={{ marginLeft: "auto" }}>

          <ItemGroup>
            <Item key="/user" icon={<DashboardOutlined />}>
              <Link href="/user" legacyBehavior>
                <a className="r-under">Dashboard</a>
              </Link>
            </Item>
            <Item onClick={logout} icon={<LogoutOutlined />}>
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
};

export default TopNav;
