import React, { Component } from "react";
//import StartDisplay from "./StartDisplay";

class StartButton extends Component {
  //set inital states to null
  state = { lat: null, long: null };
  componentDidMount() {
    //get users current location
    window.navigator.geolocation.getCurrentPosition(postion =>
      console.log({
        lat: postion.coords.latitude,
        long: postion.coords.longitude
      })
    );
  }


  render() {
    return (
      <button className="ui green basic button">
        Start
      </button>
    );
  }
}

export default StartButton;
