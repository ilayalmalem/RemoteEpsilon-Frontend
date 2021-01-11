import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import './Styles/main.scss';
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import GetStartedPage from "./Pages/GetStartedPage";
import {useRef} from "react";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";

function App() {
    const section2 = useRef(null);
    return (
        <Router>
            <div id="main"  className="w-full h-screen" dir="rtl">
                <div className="navbar-wrapper">
                    <Navbar/>
                </div>

                <div className="app">
                    <div className="content px-10 md:px-20">
                        <Switch>
                            {/*<Route path="/getstarted" exact>*/}
                            {/*    <GetStartedPage/>*/}
                            {/*</Route>*/}

                            <Route path="/teachers" exact>
                                <div className="text-white">Teachers</div>
                            </Route>

                            <Route path="/students" exact>
                                <div className="text-white">Students</div>
                            </Route>

                            <Route path="/about" exact>
                                <div className="text-white">About</div>
                            </Route>

                            <Route path="/login" component={LoginPage} />

                            <Route path="/" exact>
                                <HomePage scrollTo={section2}/>
                            </Route>
                        </Switch>
                    </div>
                </div>
                <div ref={section2} className="extender">extender</div>
            </div>
        </Router>
    );
}

export default App;
