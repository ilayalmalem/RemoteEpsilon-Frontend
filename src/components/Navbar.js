import { Icon } from "@material-ui/core";
import { useState } from "react";
import { withNamespaces } from "react-i18next";
import {Link, useHistory} from "react-router-dom";
import GlobalsService from "../services/GlobalsService";
import Menu from "./Menu";

function Navbar(props) {
    const {t} = props;
    const [selected, setSelected] = useState(0);
    const history = useHistory();
    const setActiveRoute = (id, to) => {
        history.push(to)
        setSelected(id)
    }

    const loggedRoutes = [
        {
            id: 0,
            to: '/',
            icon: 'home',
            t: 'navbar.dashboard'
        },
        {
            id: 1,
            to: '/storage',
            icon: 'storage',
            t: 'navbar.storage'
        },
        {
            id: 2,
            to: '/assignments',
            icon: 'assignment',
            t: 'navbar.assignments'
        },
        {
            id: 3,
            to: '/myclass',
            icon: 'group',
            t: 'navbar.myClassroom'
        },
    ]

    return (
        <nav className="navbar flex items-center bg-white shadow-sm py-8 flex-col w-full h-full">
            <Link className="no-underline" to="/">
                <div className="logo text-lg md:text-xl font-semibold">RemoteEpsilon</div>
            </Link>


            <div className="links w-full h-full px-6 mt-6 flex flex-col">
            {props.loggedIn ?
                    <>
                        {
                            loggedRoutes.map(route => (
                                <div onClick={() => setActiveRoute(route.id, route.to)} className={"px-2 flex items-center w-full mt-3 py-3 rounded-lg cursor-pointer " + (selected == route.id ? "bg-black text-white" : "bg-white text-black")}>
                                    <Icon>{route.icon}</Icon>
                                    <p className={"px-4 text-sm font-semibold"}>{t(route.t)}</p>
                                </div>
                            ))
                        }
                    </>
                    :
                    <>
                        <ul className="hidden md:flex link-list flex flex-col items-center">
                            <Link className="link" to="/teachers">{t('navbar.forTeachers')}</Link>
                            <Link className="link" to="/students">{t('navbar.forStudents')}</Link>
                            <Link className="link" to="/about">{t('navbar.about')}</Link>
                            <Link className="link link-main rounded-full text-white" to="/login">{t('navbar.login')}</Link>
                        </ul>
                        <div className="flex justify-center sm:justify-start md:hidden">
                            <Link className="link text-sm md:text-base text-red-400 rounded-full text-white"
                            to="/login">התחברות</Link>
                        </div>
                    </>
                }
            </div>
        </nav>
    )
}

export default withNamespaces()(Navbar);