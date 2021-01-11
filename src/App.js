import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './Styles/main.scss';
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import GetStartedPage from "./Pages/GetStartedPage";
import {useRef, useState} from "react";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AuthService from "./services/AuthService";

function App() {
    const section2 = useRef(null);
    const [loggedIn, setLoggedIn] = useState(AuthService.isAuthenticated());

    return (
        <Router>
            <div id="main"  className="w-full h-screen" dir="rtl">
                <div className="navbar-wrapper">
                    <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
                </div>

                <div className="app">
                    <div className="content px-10 md:px-20">
                        <Switch>
                            <PrivateRoute path="/dashboard/" component={Dashboard} />

                            <Route path="/teachers" exact>
                                <div className="text-white">Teachers</div>
                            </Route>

                            <Route path="/students" exact>
                                <div className="text-white">Students</div>
                            </Route>

                            <Route path="/about" exact>
                                <div className="text-white">About</div>
                            </Route>

                            <Route path="/login">
                                <LoginPage setLoggedIn={setLoggedIn} />
                            </Route>

                            <Route path="/" exact>
                                {loggedIn ?
                                    <Dashboard />
                                    :
                                    <HomePage scrollTo={section2}/>
                                }
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


const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = AuthService.isAuthenticated();

    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                )
            }
        />
    )
}
