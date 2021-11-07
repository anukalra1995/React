import React from 'react';
import Navigatepaths from './HOCComponent/Navigatepaths';
import { Nav } from 'react-bootstrap';
import Select from 'react-select';
import { Button } from '@material-ui/core';
import { internstyle, domesticstyle, navbars, hidestyle, visiblestyle } from './Styling';

let datastyle = null;

function StudentForm(props) {

  function searching() {
    return (
      <div style={{ background: "lavenderblush" }}>
        <Nav className="navbar navbar-light" >
          <div className="col-md-2">
            <Select
              options={props.option}
              onChange={(e) => props.getcategorytype(e)}
              placeholder={props.labels.labels}
            />
          </div>
          <div className="col-md-2" style={{ marginRight: "14px" }}>
            <input type="text"
              id="search"
              name="search"
              placeholder="Search by name"
              onChange={e => props.getsearchval(e)}
            />
          </div>
        </Nav>
        {
          datadisplay()
        }
      </div>
    )
  }

  function datadisplay() {
    return (
      <Nav className="navbar navbar-light">
        {
          props.labels.alldatas.length > 0 ? (
            props.labels.alldatas.map(
              (items) => {
                return exportdata(items);
              }
            )
          ) : (
              <div>
                no data found
              </div>
            )
        }
      </Nav>
    )
  }

  function exportdata(items) {
    if (props.labels.Categorytype === "Default") {
      items.Category === "International" ? (
        datastyle = internstyle
      ) : (
          datastyle = domesticstyle
        )
      return interndome(items, visiblestyle, datastyle)

    } else if (props.labels.Categorytype === "International") {
      items.Category === "International" ? (
        datastyle = interndome(items, visiblestyle, internstyle)
      ) : (
          datastyle = interndome(items, hidestyle, domesticstyle)
        )
      return datastyle;

    } else if (props.labels.Categorytype === "Domestic") {
      items.Category === "International" ? (
        datastyle = interndome(items, hidestyle, internstyle)
      ) : (
          datastyle = interndome(items, visiblestyle, domesticstyle)
        )
      return datastyle;
    }
  }

  function deletes(itemsid) {
    fetch(`http://localhost:4000/formdata/${itemsid}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(props.listdata)
    }).then((res) => res.json()).then(
      gotodelete()
    )
  }

  function gotodelete() {
    alert("deleted");
    props.history.push("/list");
    window.location.reload();
  }

  function interndome(items, visiblestyle, styling) {
    return (
      <span key={items.id} style={visiblestyle}>
        <div style={styling}>
          <br />
          {items.Name}
          <Nav className="navbar navbar-light" style={{ marginTop: "30px" }}>
            <Button color="primary" variant="contained" onClick={() => { props.gotoedit(items.id) }}> Edit</Button>
            <Button
              variant="contained"
              onClick={() => { props.gotoview(items.id) }}>
              View
             </Button>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                if (window.confirm('Are you sure you wish to delete this item?'))
                  deletes(items.id)
              }}
            >
              Delete
            </Button>
          </Nav>
        </div >
      </span>
    )
  }
  return (
    <div style={navbars}>
      {
        searching()
      }
    </div>
  )

}

export default Navigatepaths(StudentForm);