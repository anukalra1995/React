import { useState } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import HomeComponent from "./components/HomeComponent";
import ServiceComponent from "./components/ServiceComponent";
import ViewComponent from "./components/ViewComponent";
import { themes, ThemeContext } from "./themes/ThemeContext";

function App() {

  const [theme, setThemes] = useState(themes.light);
  function toggletheme() {
    theme === themes.dark
      ? setThemes(themes.light)
      : setThemes(themes.dark);
  }
  return (
    <ThemeContext.Provider value={themes}>
      <div style={theme}>
        <button onClick={toggletheme}>Toggle Theme</button>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/home" component={HomeComponent} />
              <Route path="/add" component={ServiceComponent} />
              <Route path="/view/:id" component={ViewComponent} />
              <Route path="/edit/:id" component={ServiceComponent} />
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
