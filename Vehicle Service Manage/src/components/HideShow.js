import React from "react";
import ServiceComponent from './ServiceComponent';
import ViewComponent from "./ViewComponent";
import HomeComponent from './HomeComponent';

/*
const listdata = [
  {
    id: 1,
    firstname: "Craven",
    lastname: " Moorehead",
    regno: "DEL103902",
    mobilenumber: "9911223344",
    address: "BA-90,DDA flats,Sarita Vihar,New Delhi,Delhi",
    pickupdate: "02/10/2020",
    returndate: "12/10/2020"
  },
  {
    id: 2,
    firstname: "Dixon B.",
    lastname: " Tweenerlegs",
    regno: "DEL105039",
    mobilenumber: "9933556644",
    address: "BA-90,DDA flats,Jasola Vihar,New Delhi,Delhi",
    pickupdate: "02/11/2020",
    returndate: "7/11/2020"
  },
  {
    id: 3,
    firstname: "E. Jack",
    lastname: " Ulayte",
    regno: "DEL101020",
    mobilenumber: "9912129874",
    address: "BA-90,DDA flats,Janakpuri,New Delhi,Delhi",
    pickupdate: "02/12/2020",
    returndate: "16/12/2020"
  }
]
*/

class HideShow extends React.Component {

  constructor() {
    super();
    this.state = {
      visibleComponents: this.listcomp.homelist,    //For path (between home,service,view components)
      currentdata: null,
      lastvisit: null,      //For changing the last visited row color
      vehicles: [],    //for getting full list of data array and modifiying it 
      delids: [],         //For storing deleted data in array delids
      newdata: []         //For undo operation
    }
  }

  componentDidMount() {
    this.getdetails();
  }

  getdetails = () => {
    fetch(' http://localhost:4000/listdata').then(res => res.json()).then(data => {
      this.setState({
        vehicles: data
      })
      console.log(data);
    })
  }
  listcomp = {
    homelist: HomeComponent,
    servicelist: ServiceComponent,
    viewlist: ViewComponent
  }

  getRoutedComponents = (val) => {

    if (val === this.listcomp.viewlist) {

      return <ViewComponent
        vehicles={this.state.currentdata}
        navigatepath={(path => this.navigatepath(path))}
        paths={this.listcomp.homelist}
      />;

    } else if (val === this.listcomp.servicelist) {

      return <ServiceComponent
        navigatepath={(path => this.navigatepath(path))}
        paths={this.listcomp}
      />;

    } else if (val === this.listcomp.homelist) {

      return <HomeComponent
        lastvisited={this.state.lastvisit}
        viewDetail={this.viewDetail}
        navigatepath={(path => this.navigatepath(path))}
        paths={this.listcomp}
        listdata={this.state.vehicles}
        deleteddata={this.delete}
        undo={this.undo}
      />;
    }
  }

  navigatepath = (path) => {

    this.setState({
      visibleComponents: path
    });

  }

  viewDetail = (vehicles) => {
    this.setState({
      currentdata: vehicles,
      lastvisit: vehicles.id
    });
    this.navigatepath(this.listcomp.viewlist)
  }

  delete = (items) => {

    console.log("deleted id of particular data");
    console.log(items);
    var id = items.id;
    this.setState(
      (prev) => (
        {
          vehicles: prev.vehicles.filter(item => item.id !== id)
        }
      )
    )
    var newarr = this.state.delids;
    if (newarr.includes(items)) {
      console.log("already contained");
      return 0;
    } else {
      newarr.push(items);
      this.datapush(newarr);
    }
    console.log("deleted item is: ");
    console.log(this.state.delids);
  }

  datapush = (newarr) => {
    this.setState({
      delids: newarr
    })
  }

  undo = () => {
    var deldata = this.state.delids;
    if (deldata.length > 0) {
      // var delpop = deldata.pop();
      this.setState((prev) => {
        var delpop = prev.delids.pop();
        return { vehicles: prev.vehicles.concat(delpop) }
      })
      this.setState((prev) => (
        {
          // vehicles: prev.vehicles.concat(delpop)
          vehicles: prev.vehicles.concat(deldata.pop())
        })
      )
    }
    return console.log(deldata);
  }

  render() {
    return (
      <div>
        {this.getRoutedComponents(this.state.visibleComponents)}
      </div>
    )
  }
}



export default HideShow;