import React from "react";
import RequestFormComponent from "./RequestFormComponent";
import './css/ServiceComponents.css';
// import EditFormComponent from "./EditFormComponent";
import Headers from './Headers';

function ServiceComponent(props) {
  console.log(props);
  return (
    <div id="servicing">
      <Headers headers='servicerequest' />
      <RequestFormComponent history={props.history} match={props.match} />
    </div>
  )
}

export default ServiceComponent;