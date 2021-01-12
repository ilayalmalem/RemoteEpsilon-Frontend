import {Link, useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";
import {Menu, MenuItem} from "@material-ui/core";
import {useState} from "react";

export default function Navbar(props) {

    return (
        <nav className="navbar w-full">
            <div className="navbar-content px-10 md:px-20 flex justify-between items-center text-black">
                <Link className="no-underline" to="/">
                    <div className="logo text-lg md:text-xl font-semibold">RemoteEpsilon</div>
                </Link>
                <div className="flex justify-center sm:justify-start md:hidden">
                    <Link className="link text-sm md:text-base text-red-400 rounded-full text-white"
                          to="/login">התחברות</Link>
                </div>
                {props.loggedIn ?
                    <ul className="hidden md:flex link-list flex items-center">
                        <Link className="link" to="/dashboard">דף בית</Link>
                        <Link className="link" to="/assignments">מטלות</Link>
                        <Link className="link" to="/myclass">הכיתה שלי</Link>
                        <Link className="link" to="/myaccount">
                            <LongMenu setLogged={props.setLoggedIn} />
                        </Link>
                    </ul>
                    :
                    <ul className="hidden md:flex link-list flex items-center">
                        <Link className="link" to="/teachers">למורים</Link>
                        <Link className="link" to="/students">לתלמידים</Link>
                        <Link className="link" to="/about">אודות</Link>
                        <Link className="link link-main rounded-full text-white" to="/login">התחברות</Link>
                    </ul>

                }
            </div>
        </nav>
    )
}

function LongMenu(props) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState()
    const history= useHistory();
    const recordButtonPosition = (event) => {
        setAnchorEl(event.currentTarget);
        setMenuOpen(true);
    }

    let closeMenu = () => {
        setMenuOpen(false);
    }

    return (
        <>
            <div onClick={recordButtonPosition} className="w-12 z-0 h-12 bg-black rounded-full"></div>
            <Menu
                getContentAnchorEl={null}
                anchorOrigin={{vertical: 'bottom'}}
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={closeMenu}>
                <Link to="/settings">
                    <MenuItem onClick={closeMenu}> Settings </MenuItem>
                </Link>
                <Link onClick={() => {
                    AuthService.logout();
                    props.setLogged(false);
                    history.push('/')
                }}>
                    <MenuItem onClick={closeMenu}> Logout </MenuItem>
                </Link>
            </Menu>
        </>
    );
}