import React from 'react';

function Headers(props) {
  var header = props.headers;
  if (header === 'Home') {
    return (
      <div>
        <header>
          Vehicle Service Management
        </header>
      </div>
    );
  } else if (header === 'servicerequest') {
    return (
      <div>
        <header>
          Vehicle Service Request form
        </header>
      </div>
    );
  } else if (header === 'viewservice') {
    return (
      <div>
        <header>
          Vehicle View Service
        </header>
      </div>
    );
  }
}

export default Headers;