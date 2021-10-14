import React, { Component } from "react";
import { Header } from "react-native-elements";

export class MyHeader extends Component {
  render() {
    return (
      <Header
        centerComponent={{
          text: "Lyrics Finder",
          style: { color: "#fff", fontSize: 20, fontWeight: "bold" },
        }}
      />
    );
  }
}

export default MyHeader;
