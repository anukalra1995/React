import React from "react";

const withdata = (WrappedComponent) => {
  var vehicleId = null;
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        id: '',
        firstname: '',
        lastname: '',
        regno: '',
        mobile: '',
        address: '',
        pickupdate: '',
        returndate: ''
      }
    }

    togglelload = (id) => {
      vehicleId = id;
      this.fetchiddata(id)
    }

    fetchiddata = (ids) => {
      console.log(vehicleId);
      fetch(`http://localhost:4000/listdata/${ids}`).then(res => res.json()).then(data => {
        this.setState({
          id: data.id,
          firstname: data.firstname,
          lastname: data.lastname,
          regno: data.regno,
          mobile: data.mobile,
          address: data.address,
          pickupdate: data.pickupdate,
          returndate: data.returndate
        })
      })
    }

    vehicledata = (event) => {
      this.setState({
        [event.target.name]: event.target.value
      })
    }

    render() {
      return (
        <div>
          <WrappedComponent {...this.props} isload={this.state} togglelload={val => { this.togglelload(val) }} vehicledata={val => { this.vehicledata(val) }} />
        </div>
      )
    }
  }
}
export default withdata;