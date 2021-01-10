
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './Styles/main.scss';
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";

function App() {

  return (
      <Router>
          <div id="main">
            <Navbar />
            <Switch>
                <Route path="/getstarted" exact>
                    Yeah get started
                </Route>
                <Route path="/" exact>
                    <HomePage />
                </Route>
            </Switch>
          </div>

      </Router>
  );
}

export default App;
