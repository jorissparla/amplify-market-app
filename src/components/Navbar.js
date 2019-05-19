import React from "react";
import { NavLink } from "react-router-dom";
import { Menu as Nav, Icon, Button } from "element-react";

const Navbar = ({ user, handleSignout }) => (
  <Nav mode="horizontal" theme="dark" defaultActive="1">
    <div className="nav-container">
      <Nav.Item index="1">
        <NavLink className="nav-link" to="/">
          <span className="app-title">
            <img className="app-icon" src="https://icon.now.sh/account_balance/f90" alt="App Icon" />
            Amplify Agora
          </span>
        </NavLink>
      </Nav.Item>
      <div className="nav-items">
        <Nav.Item index="2">
          <span className="app-user">Hello {user.username}</span>
        </Nav.Item>
        <Nav.Item index="3">
          <NavLink className="nav-link" to="/profile">
            <Icon name="setting" /> Profile
          </NavLink>
        </Nav.Item>
        <Nav.Item index="2">
          <Button type="warning" onClick={() => handleSignout()}>
            Sign Out
          </Button>
        </Nav.Item>
      </div>
    </div>
  </Nav>
);

export default Navbar;
