import React from 'react';
import Navbar from "./Navbar";
import StudentForm from './StudentForm';

export default class ListStudent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      Categorytype: this.options[0].value,
      labels: this.options[0].label,
      searchval: "",
      alldatas: [],

    }
    console.log(props);
  }

  componentDidMount() {
    this.getdetails();
  }

  getdetails = () => {
    fetch('http://localhost:4000/formdata', {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json()).then(
      data => {
        this.setState(
          {
            alldatas: data
          }
        )
      })
  }

  options = [
    { label: "All", value: "Default" },
    { label: "Domestic", value: "Domestic" },
    { label: "International", value: "International" }
  ]

  getcategorytype = (e) => {
    this.setState(
      {
        Categorytype: e.value
      }
    )
  }

  getsearchval = (e) => {
    let a = e.target.value;
    if (a.length > 0) {
      var searchval = this.state.alldatas.filter(
        (item) => { return item.Name.includes(e.target.value) }
      )
      this.setState(
        {
          alldatas: searchval
        }
      )
    } else {
      this.getdetails()
    }
  }

  render() {
    return (
      <div style={{ background: "white" }}>
        <Navbar {...this.props} isactive="false" />
        <StudentForm {...this.props}
          option={this.options}
          labels={this.state}
          getcategorytype={e => { this.getcategorytype(e) }}
          getsearchval={e => { this.getsearchval(e) }}
        />
      </ div>
    )
  }
}