import React from "react";
import Navigatepaths from "./HOCComponents/Navigatepaths";

let lastvisted = null, datas = null;

class CustomerTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    }
    console.log(this.props);
    console.log(this.props.history);
  }
  componentDidMount() {
    this.getdetails();
  }

  getdetails = () => {
    fetch('http://localhost:4000/listdata', {
      method: 'get',
      headers: {
        'Content-type': 'application/json'
      }
    }).then(res => res.json()).then(data => {
      this.setState({
        vehicles: data
      })
    })
  }

  myStyle = {
    outline: "1.5px solid red",
    backgroundColor: "white"
  }
  mystyles = {
    outline: "1.5px solid black",
    backgroundColor: "seashell"
  }

  deletes(itemsid) {
    fetch(`http://localhost:4000/listdata/${itemsid}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((res) => res.json()).then(
      alert("deleted"),
      this.props.navigating("home")
      // this.gotodelete
    )
  }

  viewpath(itemsid) {
    alert("Navigating to View Details");
    lastvisted = itemsid;
    this.props.gotoview(itemsid);
  }

  exportdata(items, myStyle) {

    return (
      <tr style={myStyle} key={items.id}>
        <td>
          {items.id}
        </td>
        <td>
          {items.firstname}  {items.lastname}
        </td>
        <td>{items.regno}</td>
        <td>
          <button onClick={() => { this.viewpath(items.id) }}>View</button>
        </td>
        <td>
          <button onClick={() => { this.deletes(items.id) }}>Delete</button>
        </td>
      </tr>

    )
  }

  render() {
    return (
      <div>
        <table id="tables">
          <tbody>
            {
              this.state.vehicles.length > 0 ? (
                this.state.vehicles.map((item) => {
                  item.id === lastvisted ? (
                    datas = this.exportdata(item, this.myStyle)
                  )
                    :
                    (

                      datas = this.exportdata(item, this.mystyles)
                    )
                  return datas
                })
              ) : (
                  <tr>
                    <td>
                      No data found
          </td>
                  </tr>
                )
            }
          </tbody>
        </table>
        <footer>
          <button onClick={() => { this.props.navigating("add") }}>Add New Request</button>
        </footer>
      </div>
    )
  }
}

export default Navigatepaths(CustomerTable);