import React, { Component } from 'react';
import Onboarding from './Onboarding';
import "bootstrap/dist/css/bootstrap.min.css";
import Alldata from './HOCComponent/Alldata';
import ViewComponent from './ViewComponent';

class HomeComponent extends Component {

  constructor() {
    super();
    this.state = {
      isDomicile: false,
      isBirthcertificate: false,
      isMarksheet: false,
      isPoliceClear: false,
      isPassport: false,
      isdeclare: false
    }
  }

  componentDidMount() {
    if (this.props.match.path.includes("/edit") || this.props.match.path.includes("/view")) {
      const dataid = this.props.match.params.id;
      this.props.fetchiddata(dataid);
    }
  }

  render() {
    return (
      <div>
        {
          this.props.match.path.includes("/view") ? (
            <ViewComponent {...this.props} />
          ) : (
              <Onboarding {...this.props} docchecking={this.state} />
            )
        }
      </div>
    )
  }
}

export default Alldata(HomeComponent)