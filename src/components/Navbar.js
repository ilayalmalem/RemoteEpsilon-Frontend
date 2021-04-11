import { Icon, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { withNamespaces } from "react-i18next";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import GlobalsService from "../services/GlobalsService";

function Navbar(props) {
    const { t } = props;
    const [selected, setSelected] = useState(0);
    const user = props.loggedIn ? AuthService.getUser() : {};
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
            to: '/classrooms',
            icon: 'group',
            matches: ['classrooms'],
            t: 'navbar.myClassroom'
        },
        {
            id: 4,
            to: 'settings',
            icon: 'settings',
            matches: ['settings'],
            t: 'navbar.settings'
        }
    ]

    return props.loggedIn ?
        (
            <nav className="navbar flex items-center bg-white shadow-sm pt-8 flex-col w-full h-full">
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

                <div className="bottom-section flex items-center justify-between  mt-auto p-4 w-full h-20" >
                    <div className="profile w-3/4 flex items-center">
                        <div className="profile-picture rounded-full w-12 h-12 bg-black"></div>
                        <p className="px-2 text-sm">{user.uid}</p>
                    </div>

                    <ProfileMenu history={history} setLoggedIn={props.setLoggedIn} />
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

function ProfileMenu({history, setLoggedIn}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (link) => {
        setAnchorEl(null);
        AuthService.logout();
        setLoggedIn(false);
        history.push('/')
    };
    
    const options = [
        {to: '/logout', text: "Logout"}
    ]

    return (
        <div>
            <IconButton
                style={{outline: 'none'}}
                aria-label="more"
                aria-controls="long-menu"
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVert />
            </IconButton>

            <Menu
                id="long-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
            >

                {options.map(option => (
                    <MenuItem onClick={() => handleClose(option.to)}>
                        {option.text}
                    </MenuItem>
                ))}
            </Menu>
            </div>
    );
}