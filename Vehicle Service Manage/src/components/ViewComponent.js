import React from "react";
import "./css/ViewComponents.css";
import Header from './Headers';
import ViewData from "./ViewData";

function ViewComponent(props) {
  return (
    <div>
      <div id="views">
        <Header headers='viewservice' />
        <ViewData history={props.history} match={props.match} />
      </div>
      <br />
    </div>
  );
}

export default ViewComponent;