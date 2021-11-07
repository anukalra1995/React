import React from "react";
import withdata from "./HOCComponents/Withdatas";
import Navigatepaths from "./HOCComponents/Navigatepaths";

let dataform = null;

class RequestFormComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log(props);
  }

  componentDidMount() {
    if (this.props.match.path !== "/add") {
      const dataid = this.props.match.params.id;
      // this.editform(dataid)
      this.props.togglelload(dataid);
    }
  }

  validatedata = (events) => {
    let a = events;
    var b = [], c = [], x;
    /[^a - zA - Z0 - 9]/.test(a) ?
      (
        a.split("").forEach(character => {
          /[0-9]/.test(character) ?
            (
              c = c.concat(character)
            ) :
            (
              b = b.concat(character)
            )
        }
        )
      ) :
      (
        console.log("not validated")
      )
    b.length === 3 && c.length === 7 ?
      (
        x = true
      ) :
      (
        x = false
      )
    return x;
  }

  submitEditForm = () => {
    const dataid = this.props.isload.id
    this.validatedata(this.props.isload.regno) ?
      (
        fetch(`http://localhost:4000/listdata/${dataid}`, {
          method: 'put',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.props.isload)
        }).then((res) => res.json()).then(
          this.props.gotoview(dataid)
          // () => { this.navigatepath() }
        )
      ) :
      (
        this.props.gotoedit(dataid)
      )
  }

  submitAddForm = () => {
    console.log(this.props);
    this.validatedata(this.props.isload.regno) ?
      (
        fetch(' http://localhost:4000/listdata', {
          method: 'post',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(this.props.isload)
        }).then((res) => res.json()).then(
          this.props.navigating("home")
          // () => { this.gotohome() }
        )
      ) :
      (
        this.props.navigating("add")
      )
  }

  newdata = (submitForm) => {
    return (
      <form>
        <div>
          <label id="labels">First Name:</label>
          <input type="text" name="firstname" value={this.props.isload.firstname} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div>
          <label id="labels">Last Name:</label>
          <input type="text" name="lastname" value={this.props.isload.lastname} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div>
          <label id="labels">Vehicle Registration No:</label>
          <input type="text" name="regno" value={this.props.isload.regno} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div>
          <label id="labels">Mobile Number:</label>
          <input type="tel" name="mobile" value={this.props.isload.mobile} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div>
          <label id="labels">Address:</label>
          <textarea name="address" value={this.props.isload.address} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div>
          <label id="labels">Pickup Date:</label>
          <input type="date" name="pickupdate" value={this.props.isload.pickupdate} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div>
          <label id="labels">Return Date:</label>
          <input type="date" name="returndate" value={this.props.isload.returndate} onChange={(e) => this.props.vehicledata(e)} required />
        </div>
        <br />
        <div id="buttons">
          <button onClick={submitForm}>Submit Request</button>
        </div><br />
      </form>
    )
  }

  render() {
    this.props.match.path === "/add" ? (
      dataform = this.newdata(this.submitAddForm)
    ) : (
        dataform = this.newdata(this.submitEditForm)
      )
    return dataform
  }
}

export default Navigatepaths(withdata(RequestFormComponent))