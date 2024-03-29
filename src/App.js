import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import './Styles/main.scss';
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import {useEffect, useState} from "react";
import LoginPage from "./Pages/LoginPage";
import Dashboard from "./Pages/Dashboard";
import AuthService from "./services/AuthService";
import AssignmentsOverdue from "./Pages/AssignmentsOverdue";
import AssignmentPage from "./Pages/AssignmentPage";
import TeachersDashboard from "./Pages/TeachersDashboard";
import Assignments from "./Pages/Assignments";
import GlobalsService from "./services/GlobalsService";
import AddAssignment from "./Pages/AddAssignment";
import { withNamespaces } from "react-i18next";
import Schedule from "./Pages/Schedule";
import AttendanceCheck from "./Pages/AttendanceCheck";
import Storage from "./Pages/Storage";
import Settings from "./Pages/Settings";
import axios from "axios";
import MyClassroomPage from "./Pages/MyClassroomPage";
import ClassroomStream from "./Pages/ClassroomStream";
import ClassroomPage from "./Pages/ClassroomPage";
import Logout from "./Pages/Logout";

function App() {
    const [loggedIn, setLoggedIn] = useState(AuthService.isAuthenticated());
    const [rtl, setRtl] = useState(GlobalsService.settings.isRtl);

    if ('deviceMemory' in navigator) {
        const deviceMemory = navigator.deviceMemory;
        if(deviceMemory < 1 || navigator.hardwareConcurrency < 1) {
            const confirmed = window.confirm('Your device seems weak. activate lite mode?')
            if(confirmed) {
                // activate lite mode
            }
        }
    }

    if(AuthService.isAuthenticated()) {
        axios.get("/user")
            .then(res => {
                localStorage.setItem('remote_epsilon_user', JSON.stringify(res.data))
            })
    }


    return (
        <Router>
            <div id="main"  className={"w-full min-h-screen " + (loggedIn ? 'flex': '')} style={{background: (loggedIn ? ' #F1F4F9' :  'linear-gradient(to bottom right, #B9FCFF, #fff)')}} dir={rtl ? 'rtl' : 'ltr'}>
                <div className={"navbar sticky top-0 " + (loggedIn ? 'h-screen w-1/4 shadow-none' : 'h-1/12 w-full ')} style={{'backgroundColor': (loggedIn ? ' white' :  '#D1FDFE')}}>
                    <Navbar setLoggedIn={setLoggedIn} loggedIn={loggedIn} />
                </div>

                <div className="app overflow-scroll min-h-full">
                    <div className="content h-full w-full px-10 md:px-20 pt-16">
                        <Switch>
                            <PrivateRoute path="/dashboard/" component={Dashboard} />
                            <PrivateRoute path="/assignments/add" component={AddAssignment} />
                            <PrivateRoute path="/assignments/overdue" component={AssignmentsOverdue} />
                            <PrivateRoute path="/assignment/:id" component={AssignmentPage} />
                            <PrivateRoute path="/teachers" component={TeachersDashboard} />
                            <PrivateRoute path="/assignments" component={Assignments} />
                            <PrivateRoute path="/schedule" component={Schedule} />
                            <PrivateRoute path="/attendance-check" component={AttendanceCheck} />
                            <PrivateRoute path="/storage" component={Storage} />
                            <PrivateRoute path="/settings" component={() => <Settings changeDir={setRtl} />} />
                            <PrivateRoute exact path="/classrooms" component={MyClassroomPage} />
                            <PrivateRoute exact path="/classrooms/:id" component={ClassroomPage} />
                            <PrivateRoute path="/classrooms/:id/stream" component={ClassroomStream} />

                            <Route path="/logout" exact component={() => <Logout setLoggedIn={setLoggedIn} />}></Route>

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

export default withNamespaces()(App);


const PrivateRoute = ({ component: Component, middleware, ...rest }) => {

    const isLoggedIn = AuthService.isAuthenticated();
    // Middleware here
    
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
