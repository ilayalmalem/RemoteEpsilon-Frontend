import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './Styles/main.scss';
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import {useState} from "react";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AuthService from "./services/AuthService";
import AssignmentsOverdue from "./Pages/AssignmentsOverdue";
import AssignmentPage from "./Pages/AssignmentPage";
import TeachersDashboard from "./Pages/TeachersDashboard";
import Assignments from "./Pages/Assignments";
import GlobalsService from "./services/GlobalsService";
import AddAssignment from "./Pages/AddAssignment";

function App() {
    const [loggedIn, setLoggedIn] = useState(AuthService.isAuthenticated());


    if ('deviceMemory' in navigator) {
        const deviceMemory = navigator.deviceMemory;
        if(deviceMemory < 1 || navigator.hardwareConcurrency < 2) {
            const confirmed = window.confirm('Your device seems weak. activate lite mode?')
            if(confirmed) {
                // activate lite mode
            }
        }
    }

    return (
        <Router>
            <div id="main"  className={"w-full h-screen"} style={{background: (loggedIn ? ' white' :  'linear-gradient(to bottom right, #B9FCFF, #fff)')}} dir={GlobalsService.settings.isRtl ? 'rtl': 'ltr'}>
                <div className={"navbar-wrapper flex items-center sticky top-0" + (loggedIn ? ' shadow-none' : '')} style={{'backgroundColor': (loggedIn ? ' white' :  '#D1FDFE')}}>
                    <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
                </div>

                <div className="app">
                    <div className="content px-10 md:px-20">
                        <Switch>
                            <PrivateRoute path="/dashboard/" component={Dashboard} />
                            <PrivateRoute path="/assignments/add" component={AddAssignment} />
                            <PrivateRoute path="/assignments/overdue" component={AssignmentsOverdue} />
                            <PrivateRoute path="/assignment/:id" component={AssignmentPage} />
                            <PrivateRoute path="/teachers" component={TeachersDashboard} />
                            <PrivateRoute path="/assignments" component={Assignments} />


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
                                    AuthService.getUser().role == "student" ? <Dashboard /> : <TeachersDashboard />
                                    :
                                    <HomePage />
                                }
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;


const PrivateRoute = ({ component: Component, ...rest }) => {

    const isLoggedIn = AuthService.isAuthenticated();

    return (
        <Route
            exact
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
