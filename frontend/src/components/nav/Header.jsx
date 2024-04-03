import { useState } from "react";
import {
  AppstoreOutlined,
  DashboardFilled,
  LogoutOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";

const StyledMenu = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;


export const Header = () => {
  const [current, setCurrent] = useState("home");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((state) => ({...state}));
  
  const showShowLoginAndRgister = !user.user;

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
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
        firebase.auth().signOut();
        dispatch({
          type: "LOGOUT",
          payload: null 
        })
        navigate("/login")
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
            style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            items={[
              {
                label: <span>{(user.user.email && user.user.email.split("@")[0]) || (user.user.username && user.user.username)}</span>,
                key: "Submenu",
                icon: <SettingOutlined />,
                children: [
                  {
                    label: "Dashboard",
                    key: "dashboard",
                    icon: <DashboardFilled/>
                  },
                  {
                    label: "Logout",
                    key: "logout",
                    icon: <LogoutOutlined/>
                  }
                ]
              },
            ]}
          />
        )}
      </StyledMenu>
    </>
  );
};
