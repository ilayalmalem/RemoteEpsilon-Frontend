import {useLocation, } from "react-router-dom";
import AuthService from '../services/AuthService';


export default function Dashboard(props) {
    const user = AuthService.getUser();
    const location = useLocation();
    return (
        <div>
            Hello, {user.name}
        </div>
    );

}