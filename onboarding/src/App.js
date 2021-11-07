import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import HomeComponent from "./components/HomeComponent";
import ListStudent from "./components/ListStudent";
import Login from './components/Login'

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/home" component={HomeComponent} />
          <Route path="/list" component={ListStudent} />
          <Route path="/edit/:id" component={HomeComponent} />
          <Route path="/view/:id" component={HomeComponent} />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
