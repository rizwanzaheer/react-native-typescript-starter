import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import { Provider, connect } from "react-redux";
import { bindActionCreators } from "redux";
import actions from "../../actions";
import { ICounterProps } from "../../interfaces/screens";
import ICONS from "../../config/icons";

function mapStateToProps(state: any) {
  return { counter1: state.counter1, app: state.app };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<any>) {
    return { actions : bindActionCreators(actions, dispatch) };
}

class Counter extends Component<any, void> {

  static navigatorStyle = {
    drawUnderNavBar: true,
    navBarTranslucent: true
  };
  static navigatorButtons = {
    rightButtons: [
      {
        icon: ICONS.ADD, // for icon button, provide the local image asset name
        id: "add" // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      },
      {
        title: "Edit", // for a textual button, provide the button title (label)
        id: "edit", // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
        disabled: true, // optional, used to disable the button (appears faded and doesn't interact)
        disableIconTint: true, // optional, by default the image colors are overridden and tinted to navBarButtonColor, set to true to keep the original image colors
      }
    ],
    leftButtons: [
      {
        icon: ICONS.EDIT, // for icon button, provide the local image asset name
        id: "edit" // id for this button, given in onNavigatorEvent(event) to help understand which button was clicked
      }
    ]
  };

  constructor(props: any) {
      super(props);
      console.log(props);
  }

  public nextScreen() {
    this.props.navigator.push({
      screen: "screen.Counter2",
      title: "Title 2"
    });
  }

  public exploreAnimatedApi(){
  }

  public onModalPress() {
    this.props.navigator.showModal({
      title: "Modal",
      screen: "modals.Modal"
    });
  }

  public render() {
    return (
      <View style={styles.container}>
        <Text style={styles.counter}>
            {this.props.counter1.counter}
        </Text>
        <Text style={styles.welcome}>
          {this.props.app.appName}
        </Text>
        <TouchableOpacity
            style={styles.button}
            onPress={this.props.actions.increaseItemC1}>
            <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={this.nextScreen.bind(this)}>
        <Text style={styles.buttonText}>Go -></Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={this.onModalPress.bind(this)}>
        <Text style={styles.buttonText}>Modal</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#003340",
  } as React.ViewStyle,
  button: {
    width: 100,
    height: 30,
    backgroundColor: "#092228",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#06566b",
    borderWidth: 1,
    borderRadius: 5
  } as React.ViewStyle,
  buttonText: {
      color: "white"
  } as React.TextStyle,
  counter: {
      fontSize: 100,
      color: "#2c5e6a",
      textAlign: "center"
  } as React.TextStyle,
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    color: "lightgrey"
  } as React.TextStyle
});