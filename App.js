import React, { Component } from "react";
import { ScrollView, Text, View, StyleSheet, Image } from "react-native";
import MyHeader from "./components/Header";
import { Input, Button } from "react-native-elements";
import { PacmanIndicator } from "react-native-indicators";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      artistName: "Taylor swift",
      songName: "fearless",
      lyrics: "",
    };
  }

  getData = async () => {
    try {
      // i am just converting all the states to lower case and putting all into its correct places and at last i am replacing all the blank spaces with replace method
      // by the way /\s/g means " " (all the blank space)
      url =
        `https://api.lyrics.ovh/v1/${this.state.artistName.toLowerCase()}/${this.state.songName.toLowerCase()}`.replace(
          /\s/g,
          "%20"
        );

      req = await fetch(url);
      res = await req.json();

      // you can learn more about these signs here :- https://dmitripavlutin.com/replace-all-string-occurrences-javascript/
      this.setState({
        data: res,
        lyrics: res.lyrics ? res.lyrics.replace(/\n/gi, "") : "",
      });
    } catch (e) {
      alert("some error ocurred in fetching the data");
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <MyHeader />
        <View style={{ marginHorizontal: 20, marginTop: 20 }}>
          <Input
            placeholder="Artist Name"
            onChangeText={(artistName) =>
              this.setState({ artistName: artistName.trim() })
            }
            value={this.state.artistName}
          />
          <Input
            placeholder="Song Name"
            onChangeText={(SongName) =>
              this.setState({ songName: SongName.trim() })
            }
            value={this.state.songName}
          />
          <Button
            title="Search"
            buttonStyle={{ marginHorizontal: 10 }}
            onPress={() => {
              !this.state.artistName
                ? alert("Pls fill up the artist Name input box")
                : !this.state.songName
                ? alert("Pls fill up the song Name Input box")
                : this.getData();
            }}
          />
        </View>
        {this.state.data ? (
          <View>
            <View style={styles.Contentcontainer}>
              <Text style={styles.upperBoxTextStyle}>
                Artist : {this.state.artistName.trim()}
              </Text>
              <Text style={styles.upperBoxTextStyle}>
                Song : {this.state.songName.trim()}
              </Text>
            </View>
            {this.state.lyrics !== "" ? (
              <View style={[styles.Contentcontainer, { height: "60%" }]}>
                <ScrollView>
                  <Text
                    style={{
                      color: "#808080",
                      fontWeight: "bold",
                      fontSize: 20,
                    }}
                  >
                    {this.state.lyrics}
                  </Text>
                </ScrollView>
              </View>
            ) : (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  alignSelf: "center",
                  marginTop: "10%",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {this.state.data.error ? this.state.data.error : ""}
                </Text>

                <Image
                  source={require("./images/error.png")}
                  style={{ width: 300, height: 250, marginTop: 40 }}
                />
              </View>
            )}
          </View>
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PacmanIndicator color="#0B5798" size={100} />
          </View>
        )}
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  Contentcontainer: {
    borderWidth: 2,
    borderColor: "#eeeeee",
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 30,
    marginTop: 16.5,
    borderRadius: 10,
  },
  upperBoxTextStyle: {
    fontSize: 17.5,
    fontWeight: "bold",
  },
});
