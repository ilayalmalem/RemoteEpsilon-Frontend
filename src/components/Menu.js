import {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {Menu as MUIMenu, MenuItem} from "@material-ui/core";
import AuthService from "../services/AuthService";

export default function Menu(props) {
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
            <MUIMenu
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
            </MUIMenu>
        </div>
    );
}
