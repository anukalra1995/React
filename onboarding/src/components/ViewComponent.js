import React from 'react';
import Alldata from './HOCComponent/Alldata';
import Navbar from './Navbar';
import { Button } from '@material-ui/core';
import "./CSS/View.css";
import "bootstrap/dist/css/bootstrap.min.css"
import Navigatepaths from "./HOCComponent/Navigatepaths";

class ViewComponent extends React.Component {

  constructor(props) {
    super(props);
    console.log(props.values);
  }

  componentDidMount() {
    const dataid = this.props.match.params.id;
    this.props.fetchiddata(dataid);
  }


  viewdatadisplay() {
    return (
      <form className="form">
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Student Name</label>
          <input type="text" id="names" name="Name" value={this.props.values.Name} disabled />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label" name="Category">Category</label>
          <div className="col-md-4">
            <input type="text" id="categorys" name="Name" value={this.props.values.Category} disabled />
          </div>
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Documents</label>
          <div className="col-md-4">
            {
              this.props.values.documents.length > 0 ? (
                this.props.values.documents.map(
                  (items) => {
                    return (
                      <div key={items}>
                        {
                          items
                        }
                      </div>
                    )
                  }
                )
              ) : (
                  <div>
                    No document found
                  </div>
                )
            }
          </div>
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Date Of Birth</label>
          <input type="date" id="names" name="dob" value={this.props.values.dob} disabled />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Father's Name</label>
          <input type="text" id="names" name="fname" value={this.props.values.fname} disabled />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Mother's Name</label>
          <input type="text" id="names" name="mname" value={this.props.values.mname} disabled />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Last class Score</label>
          <input type="text" id="names" name="score" value={this.props.values.score} disabled />
        </div>
        <Button type="submit" variant="contained" style={{ marginRight: "20px", marginBottom: "20px" }} disabled>
          OnBoard
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => this.props.navigating("/list")}
          style={{ marginLeft: "20px", marginBottom: "20px" }}
        >
          Back to List View
        </Button>
      </form>
    )
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} isactive="true" />
        {
          this.viewdatadisplay()
        }
      </div>
    )
  }
}

export default Alldata(Navigatepaths(ViewComponent));