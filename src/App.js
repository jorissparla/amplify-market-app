import React, { useState, useEffect } from "react";
import Amplify, { Auth, Hub } from "aws-amplify";
import { Authenticator, AmplifyTheme } from "aws-amplify-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import awsexports from "./aws-exports";
import HomePage from "./pages/HomePage";
import MarketPage from "./pages/MarketPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import "./App.css";

export const UserContext = React.createContext();

Amplify.configure(awsexports);

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const onHubCapsule = capsule => {
    switch (capsule.payload.event) {
      case "signIn":
        console.log("signed in");
        getUserData();
        break;
      case "signUp":
        console.log("signed up");
        break;
      case "signOut":
        console.log("signed out");
        setUser(null);
        break;
      default:
        return;
    }
  };
  Hub.listen("auth", onHubCapsule);
  const getUserData = async () => {
    const user = await Auth.currentAuthenticatedUser();
    user ? setUser(user) : setUser(null);
  };

  const handleSignout = async () => {
    try {
      await Auth.signOut();
    } catch (err) {
      console.log(err);
    }
  };

  return !user ? (
    <Authenticator theme={theme} />
  ) : (
    <UserContext.Provider value={{ user }}>
      <Router>
        <>
          <Navbar user={user} handleSignout={handleSignout} />
          <div className="app-container">
            <Route exact path="/" component={HomePage} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route
              exact
              path="/markets/:marketId"
              component={({ match }) => <MarketPage marketId={match.params.marketId} user={user} />}
            />
          </div>
        </>
      </Router>
    </UserContext.Provider>
  );
};

const theme = {
  ...AmplifyTheme,
  navBar: {
    ...AmplifyTheme,
    background: "linear-gradient(to right, rgb(82, 71, 99) 0%, rgb(55, 49, 66) 100%)",
    color: "white"
  },
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "var(--light-blue)",
    color: "white"
  },
  sectionHeader: {
    ...AmplifyTheme.sectionHeader,
    backgroundColor: "var(--light-blue)"
  }
};

export default App;
