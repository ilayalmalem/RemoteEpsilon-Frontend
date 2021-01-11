import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar w-full">
            <div className="navbar-content px-10 md:px-20 flex justify-between items-center text-black">
                <Link className="no-underline" to="/">
                    <div className="logo text-lg md:text-xl font-semibold">RemoteEpsilon</div>
                </Link>
                <div className="flex justify-center sm:justify-start md:hidden">
                    <Link className="link text-sm md:text-base text-red-400 rounded-full text-white" to="/login">התחברות</Link>
                </div>
                <ul className="hidden md:flex link-list flex items-center">
                    <Link className="link" to="/teachers">למורים</Link>
                    <Link className="link" to="/students">לתלמידים</Link>
                    <Link className="link" to="/about">אודות</Link>
                    <Link className="link link-main rounded-full text-white" to="/login">התחברות</Link>
                </ul>
            </div>
        </nav>
    )
}