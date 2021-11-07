import React from "react";

let wayback = null;
const Navigatepaths = (WrappedComponent) => {
  return class extends React.Component {

    navigating = (val) => {
      console.log(val);
      if (val === "home") {
        wayback = this.gotohome();
      } else if (val === "add") {
        wayback = this.gotoadd();
      }
      return wayback
    }

    gotoadd = () => {
      this.props.history.push("/add");
    }

    gotohome = () => {
      this.props.history.push("/home");
    }

    gotoedit = (dataid) => {
      this.props.history.push(`/edit/${dataid}`);
    }

    gotoview = (dataid) => {
      this.props.history.push(`/view/${dataid}`);
    }
    render() {
      return (
        <div>
          <WrappedComponent {...this.props} navigating={val => this.navigating(val)} gotoedit={id => this.gotoedit(id)} gotoview={id => { this.gotoview(id) }} />
        </div>
      )
    }
  }
}

export default Navigatepaths;