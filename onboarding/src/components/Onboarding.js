import React from 'react';
import { Checkbox, Button } from '@material-ui/core';
import './CSS/Onboarding.css'
import Navbar from './Navbar';
import Select from 'react-select';
import Navigatepaths from './HOCComponent/Navigatepaths';

function Onboarding(props) {

  const categories = props.values.Category;
  const documentforms = () => {
    console.log(props.values.documents);
    return (
      <div id="labels" value={props.values.documents} onChange={(e) => props.documentdata(e.target.value)}>
        <div>
          <label>
            <span id="span">Domicile *</span>
            <Checkbox value="Domicile" />
          </label>
        </div>
        <div>
          <label>
            <span id="spans">Birth Certificate *</span>
            <Checkbox value="Birth Certificate" />
          </label>
        </div>
        <div>
          <label>
            <span id="span">Marksheet *</span>
            <Checkbox value="Marksheet" />
          </label>
        </div>
        {
          categories.includes("International") ? (checkdata("*")) : (checkdata(" "))
        }
        <div>
          <label>
            <span id="span">Declaration *</span>
            <Checkbox value="Declaration" />
          </label>
        </div>
      </div>
    )
  }

  const checkdata = (val) => {
    return (
      <div>
        <div>
          <label>
            <span id="spans">Police Clearence {val}</span>
            <Checkbox value="Police Clearence" />
          </label>
        </div>
        <div>
          <label>
            <span id="spaned">Passport {val}</span>
            <Checkbox value="Passport" />
          </label>
        </div>
      </div>
    )
  }

  const createforms = (submitforms) => {
    return (
      <form>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Student Name</label>
          <input type="text" id="name" name="Name" value={props.values.Name}
            onChange={(e) => props.studentdata(e)} autoFocus />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label" name="Category">Category</label>
          <div className="col-md-4">
            {
              props.match.path.includes("/home") ? (
                <Select options={props.options} onChange={(e) => props.categorydata(e)} placeholder="Category" defaultInputValue={categories} />
              ) : (
                  <Select options={props.options} onChange={(e) => props.categorydata(e)} placeholder="Category" inputValue={categories} />
                )
            }
          </div>
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Documents</label>
          {
            documentforms()
          }
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Date Of Birth</label>
          <input type="date" id="name" name="dob" value={props.values.dob}
            onChange={(e) => props.studentdata(e)} />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Father's Name</label>
          <input type="text" id="name" name="fname" value={props.values.fname}
            onChange={(e) => props.studentdata(e)} />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Mother's Name</label>
          <input type="text" id="name" name="mname" value={props.values.mname}
            onChange={(e) => props.studentdata(e)} />
        </div>
        <div className="form-group row">
          <label id="label" className="col-sm-2 col-form-label">Last class Score</label>
          <input type="text" id="name" name="score" value={props.values.score}
            onChange={(e) => props.studentdata(e)} />
        </div>
        <Button type="submit" variant="contained" color="primary" onClick={submitforms}
          style={{ marginBottom: "20px" }}>
          OnBoard
        </Button>
      </form>
    )
  }

  function submitAddForm() {
    if (validating()) {
      fetch(' http://localhost:4000/formdata', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(props.values)
      }).then((res) => res.json()).then(
        alert("submitted data"),
        props.navigating("/list")
      )
    } else {
      alert("Not Validated")
      window.location("/home")
      // props.navigating("/home")
    }
  }

  function submitEditForm() {
    if (validating()) {
      const dataid = props.values.id
      fetch(`http://localhost:4000/formdata/${dataid}`, {
        method: 'put',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(props.values)
      }).then((res) => res.json()).then(
        alert("editted successful"),
        props.navigating("/list")
        // props.history.push("/list")
      )
    } else {
      alert("Not Validated")
      props.navigating("/home")
    }
  }

  const validating = () => {
    const d = props.values.documents;
    let decide = null;
    if (d.length >= 4 && doccheck()) {
      if (categories === "International") {
        if (d.includes("Police Clearence") && d.includes("Passport")) {
          decide = true;
        } else {
          decide = false
        }
      } else {
        decide = true
      }
      return decide;
    } else {
      alert("documents should be of length 4")
      return false;
    }
  }

  const doccheck = () => {
    let element = props.values.documents;
    console.log(element);
    let tf = null;
    if (element.includes("Domicile") &&
      element.includes("Birth Certificate") &&
      element.includes("Marksheet") &&
      element.includes("Declaration")) {
      tf = true;
    } else {
      tf = false
    }
    return tf;
  }
  return (
    <div >
      <Navbar {...props} isactive="true" />
      <div className="forms">
        <h1>
          Onboarding Form
        </h1>

        {
          props.match.path === "/home" ? (
            createforms(submitAddForm)
          ) : (
              createforms(submitEditForm)
            )
        }
      </div>
    </div>
  )
}

export default Navigatepaths(Onboarding);