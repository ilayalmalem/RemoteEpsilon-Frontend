import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar w-full">
            <div className="navbar-content px-20 flex justify-center lg:justify-between items-center text-black">
                <Link className="no-underline" to="/">
                    <div className="logo font-semibold">RemoteEpsilon</div>
                </Link>
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