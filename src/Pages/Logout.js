import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import AuthService from '../services/AuthService';

export default function Logout({setLoggedIn}) {
    const history = useHistory();

    useEffect(() => {
        AuthService.logout();
        setLoggedIn(false);
        history.push('/');
    }, [])
    return (
        <div>
            Bye
        </div>
    )
}
