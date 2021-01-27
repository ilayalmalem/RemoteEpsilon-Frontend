import {Link} from "react-router-dom";
import Menu from "./Menu";

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
                            <Menu className="link" setLogged={props.setLoggedIn} />
                        </ul>
                        <ul className="flex md:hidden link-list flex items-center">

                            <Menu className="link" isMobile={true} setLogged={props.setLoggedIn} />
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
