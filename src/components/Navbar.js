import {Link, useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";
import {Button, Menu, MenuItem} from "@material-ui/core";
import {useState} from "react";

export default function Navbar(props) {

    return (
        <nav className="navbar w-full">
            <div className="navbar-content px-10 md:px-20 flex justify-between items-center text-black">
                <Link className="no-underline" to="/">
                    <div className="logo text-lg md:text-xl font-semibold">RemoteEpsilon</div>
                </Link>

                {props.loggedIn ?
                    <>
                        <ul className="hidden md:flex link-list flex items-center">
                            <Link className="link" to="/storage">אחסון</Link>
                            <Link className="link" to="/assignments">מטלות</Link>
                            <Link className="link" to="/myclass">הכיתה שלי</Link>
                            <LongMenu className="link" setLogged={props.setLoggedIn} />
                        </ul>
                        <ul className="flex md:hidden link-list flex items-center">
                            {/*<Link className="link" to="/storage">אחסון</Link>*/}
                            {/*<Link className="link" to="/assignments">מטלות</Link>*/}
                            {/*<Link className="link" to="/myclass">הכיתה שלי</Link>*/}
                            <LongMenu className="link" isMobile={true} setLogged={props.setLoggedIn} />
                        </ul>
                    </>
                    :
                    <>
                        <ul className="hidden md:flex link-list flex items-center">
                            <Link className="link" to="/teachers">למורים</Link>
                            <Link className="link" to="/students">לתלמידים</Link>
                            <Link className="link" to="/about">אודות</Link>
                            <Link className="link link-main rounded-full text-white" to="/login">התחברות</Link>
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

function LongMenu(props) {
    const [anchorEl, setAnchorEl] = useState(null);
    const history= useHistory();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div>
            <button className="link w-12 outline-none z-0 cursor-pointer h-12 bg-black rounded-full" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}></button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/profile">
                    <MenuItem onClick={handleClose}>החשבון שלי</MenuItem>
                </Link>
                {props.isMobile ?
                    <>
                        <Link to="/storage">
                            <MenuItem onClick={handleClose}>אחסון</MenuItem>
                        </Link>

                        <Link to="/assignments">
                            <MenuItem onClick={handleClose}>מטלות</MenuItem>
                        </Link>

                        <Link to="/myclass">
                            <MenuItem onClick={handleClose}>הכיתה שלי</MenuItem>
                        </Link>
                    </>
                :""}

                <div onClick={() => {
                     AuthService.logout();
                     props.setLogged(false);
                     history.push('/')
                 }}>
                    <MenuItem onClick={handleClose}>התנתק</MenuItem>
                </div>
            </Menu>
        </div>
    );
}

// function LongMenu(props) {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const [anchorEl, setAnchorEl] = useState()
//     const history= useHistory();
//     const recordButtonPosition = (event) => {
//         setAnchorEl(event.currentTarget);
//         setMenuOpen(true);
//     }
//
//     let closeMenu = () => {
//         setMenuOpen(false);
//     }
//
//     return (
//         <>
//             <div onClick={recordButtonPosition} className="w-12 z-0 cursor-pointer h-12 bg-black rounded-full"></div>
//             <Menu
//                 getContentAnchorEl={null}
//                 anchorOrigin={{vertical: 'center', horizontal: 'center'}}
//                 anchorEl={anchorEl}
//                 open={menuOpen}
//                 onClose={closeMenu}>
//                 <Link to="/settings">
//                     <MenuItem onClick={closeMenu}> Settings </MenuItem>
//                 </Link>
//                 <div onClick={() => {
//                     AuthService.logout();
//                     props.setLogged(false);
//                     history.push('/')
//                 }}>
//                     <MenuItem onClick={closeMenu}> Logout </MenuItem>
//                 </div>
//             </Menu>
//         </>
//     );
// }