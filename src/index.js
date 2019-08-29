import "./componets/display.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import startPic from "./images/run_shadow.svg";

class Home extends Component {
  state = {
    message: "",
    StartLat: null,
    StartLong: null,
    StopLat: null,
    StopLong: null
  };

  _running = () => {
    window.navigator.geolocation.getCurrentPosition(postion => {
      console.log(postion.coords.latitude);
      this.setState({
        StartLat: postion.coords.latitude,
        StartLong: postion.coords.longitude
      });
      console.log(this.state.StartLat);
      this.setState({ message: "Running now" });
    });
  };

  _stopRunning = () => {
    window.navigator.geolocation.getCurrentPosition(postion => {
      //console.log( postion.coords.latitude);
      this.setState({
        StopLat: postion.coords.latitude,
        StopLong: postion.coords.longitude
      });
      console.log(this.state.StartLat, this.state.StopLat);
      const totalDis = this.totalDistance();
      console.log(totalDis);
      this.setState({
        message: "Total Distance Covered is  " + Math.ceil(totalDis) + "M"
      });
    });
  };

  totalDistance = () => {
    const earthRadius = 3959; //in meters
    const latRad = this.totalRads(this.state.StartLat - this.state.StopLat);
    const longRad = this.totalRads(this.state.StartLong - this.state.StopLong);

    const a =
      Math.sin(latRad / 2) * Math.sin(latRad / 2) +
      Math.cos(this.totalRads(this.state.StartLat)) *
        Math.cos(this.totalRads(this.state.StopLat)) *
        Math.sin(longRad / 2) *
        Math.sin(longRad / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
  };
  totalRads = latlongDistance => {
    return (latlongDistance * Math.PI) / 180;
  };

  render() {
    const { message } = this.state;
    return (
      <div className="show">
        <img alt="runing" src={startPic} />
        Running Man
        <br />
        {message}
        <br />
        <button className="ui green basic button" onClick={this._running}>
          {" "}
          Start{" "}
        </button>
        <button className="ui red basic button" onClick={this._stopRunning}>
          {" "}
          Stop{" "}
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Home />, document.querySelector("#root"));

export default Home;
