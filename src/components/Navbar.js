import react from 'react';
import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link className="no-decoration" to="/">
                    <div className="logo">RemoteEpsilon</div>
                </Link>
                <ul className="link-list">
                    <Link className="link" to="/">For teachers</Link>
                    <Link className="link" to="/login">About</Link>
                    <Link className="link" to="/register">For students</Link>
                    <Link className="link link-main" to="/getstarted">Get started</Link>
                </ul>
            </div>
        </nav>
    )
}