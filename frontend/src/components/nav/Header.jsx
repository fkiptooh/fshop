import { useState } from "react";
import {
  AppstoreOutlined,
  LogoutOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const showShowLoginAndRgister = true;

export const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key); // Always set current key first
    switch (e.key) {
      case "home":
        navigate("/");
        break;
      case "register":
        navigate("/register");
        break;
      case "login":
        navigate("/login");
        break;
      case "logout":
        navigate("/logout");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StyledMenu>
        <Menu
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          style={{ display: "flex", flex: 1}}
          items={[
            {
              label: "Home",
              key: "home",
              icon: <AppstoreOutlined />,
            },
          ]}
        />
        {showShowLoginAndRgister ? (
          <Menu
            selectedKeys={[current]}
            mode="horizontal"
            onClick={onClick}
            style={{ display: "flex", flex: 1, justifyContent: "flex-end"}}
            items={[
              {
                label: "Login",
                key: "login",
                icon: <UserOutlined />,
              },
              {
                label: "Register",
                key: "register",
                icon: <UserAddOutlined />,
              },
            ]}
          />
        ) : (
          <Menu
            selectedKeys={[current]}
            mode="horizontal"
            onClick={onClick}
            items={[
              {
                label: "Logout",
                key: "logout",
                icon: <LogoutOutlined />,
              },
            ]}
          />
        )}
      </StyledMenu>
    </>
  );
};
