import react from 'react';
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar w-full">
            <div className="navbar-content flex justify-between items-center text-white">
                <Link className="no-underline" to="/">
                    <div className="logo font-bold">RemoteEpsilon</div>
                </Link>
                <ul className="link-list flex items-center">
                    <Link className="link" to="/">For teachers</Link>
                    <Link className="link" to="/login">About</Link>
                    <Link className="link" to="/register">For students</Link>
                    <Link className="link link-main rounded-full" to="/getstarted">Get started</Link>
                </ul>
            </div>
        </nav>
    )
}