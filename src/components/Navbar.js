import { Icon } from "@material-ui/core";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import GlobalsService from "../services/GlobalsService";
import Menu from "./Menu";

function Navbar(props) {
    const { t } = props;
    const [selected, setSelected] = useState(0);
    const history = useHistory();
    const setActiveRoute = (id, to) => {
        history.push(to)
        setSelected(id)
    }

    useEffect(() => {
        const path = window.location.pathname;
        const prefix = path.split('/')[1];
        loggedRoutes.forEach(route => {
            if(route.matches.includes(prefix)) {
                setSelected(route.id)
            }
        })
    })

    const loggedRoutes = [
        {
            id: 0,
            to: '/',
            matches: ['', 'dashboard'],
            icon: 'home',
            t: 'navbar.dashboard'
        },
        {
            id: 1,
            to: '/storage',
            matches: ['storage'],
            icon: 'storage',
            t: 'navbar.storage'
        },
        {
            id: 2,
            to: '/assignments',
            icon: 'assignment',
            matches: ['assignments'],
            t: 'navbar.assignments'
        },
        {
            id: 3,
            to: '/myclass',
            icon: 'group',
            matches: ['myclass'],
            t: 'navbar.myClassroom'
        },
    ]

    return props.loggedIn ?
        (
            <nav className="navbar flex items-center bg-white shadow-sm py-8 flex-col w-full h-full">
                <Link onClick={() => setSelected(0)} className="no-underline" to="/">
                    <div className="logo text-lg md:text-xl font-semibold">RemoteEpsilon</div>
                </Link>

                <div className="links w-full h-full px-6 mt-6 flex flex-col">
                    {
                        loggedRoutes.map(route => (
                            <div key={route.id} onClick={() => setActiveRoute(route.id, route.to)} className={"px-2 flex items-center w-full mt-3 py-3 rounded-lg cursor-pointer " + (selected == route.id ? "bg-black text-white" : "bg-white text-black")}>
                                <Icon>{route.icon}</Icon>
                                <p className={"px-4 font-semibold"}>{t(route.t)}</p>
                            </div>
                        ))
                    }
                    <div 
                    className={"mt-auto"}
                    onClick={() => {
                        AuthService.logout();
                        props.setLoggedIn(false);
                        history.push('/')
                    }}>Logout</div>
                </div>
            </nav>
        )
        : (
            <nav className={"navbar-content py-12 px-10 md:px-20 flex justify-between items-center text-black"} style={{ background: props.loggedIn ? 'white' : '' }}>
                <Link className="no-underline" to="/">
                    <div className="logo text-lg md:text-xl font-semibold">RemoteEpsilon</div>
                </Link>
                <ul className="hidden md:flex link-list flex items-center">
                    <Link className={"link " + (GlobalsService.settings.isRtl ? 'ml-12' : 'mr-12')} to="/teachers">{t('navbar.forTeachers')}</Link>
                    <Link className={"link " + (GlobalsService.settings.isRtl ? 'ml-12' : 'mr-12')} to="/students">{t('navbar.forStudents')}</Link>
                    <Link className={"link " + (GlobalsService.settings.isRtl ? 'ml-12' : 'mr-12')} to="/about">{t('navbar.about')}</Link>
                    <Link className="link link-main rounded-full text-white" to="/login">{t('navbar.login')}</Link>
                </ul>
                <div className="flex justify-center sm:justify-start md:hidden">
                    <Link className="link text-sm md:text-base text-red-400 rounded-full"
                        to="/login">התחברות</Link>
                </div>
            </nav>
        )
}

export default withNamespaces()(Navbar);