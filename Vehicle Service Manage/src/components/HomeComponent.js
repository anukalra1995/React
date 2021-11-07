import React from "react";
import CustomerTable from "./CustomerTable";
import "./css/HomeComponents.css";
import Headers from './Headers';

function HomeComponent(props) {
  return (
    <div id="roots">
      <div id="forms">
        <Headers headers='Home' />
        <CustomerTable history={props.history} />
      </div>
    </div>
  )
}


export default HomeComponent;