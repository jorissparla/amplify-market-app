import React from "react";
import Amplify from "aws-amplify";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react"; // or 'aws-amplify-react-native';
import awsexports from "./aws-exports";
import "./App.css";

Amplify.configure(awsexports);
class App extends React.Component {
  state = {};

  render() {
    return <div>App</div>;
  }
}

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
export default withAuthenticator(App, true, [], null, theme);
