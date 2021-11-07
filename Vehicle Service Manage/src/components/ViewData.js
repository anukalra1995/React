import React from "react";
import "./css/ViewData.css";
import withdata from './HOCComponents/Withdatas';
import Navigatepaths from "./HOCComponents/Navigatepaths";

let vehicleId = null;

class ViewData extends React.Component {

  constructor(props) {
    super(props);
    vehicleId = props.match.params.id;
  }

  componentDidMount() {
    this.props.togglelload(vehicleId);
  }

  render() {
    return (
      <div>
        <table id="form">
          <tbody>
            <tr>
              <td>
                <label id="label" >First Name: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.firstname}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="label" >Last Name: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.lastname}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="label" >Vehicle Registration No: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.regno}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="label" >Mobile Number: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.mobile}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="label" >Address: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.address}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="label" >Pickup Date: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.pickupdate}</span>
              </td>
            </tr>
            <tr>
              <td>
                <label id="label" >Return Date: </label>
              </td>
              <td>
                <span id="add">{this.props.isload.returndate}</span>
              </td>
            </tr>

          </tbody>
        </table>
        <button id="button" onClick={() => { this.props.gotoedit(vehicleId) }}>Edit</button>
        <button id="button" onClick={() => this.props.navigating("home")}>Back to Home Page</button>
      </div>
    )
  }
}

export default Navigatepaths(withdata(ViewData));
