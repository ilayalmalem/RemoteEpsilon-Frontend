import React from 'react';
import axios from 'axios';
import {useState} from "react";
import '../Styles/authentication.css';
import '../Styles/registerPage.css';


export default function RegisterPage() {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const postToServer = () => {
        axios.post('http://127.0.0.1:8000/api/register', {
            uid: id,
            email: email,
            password: password

        }).then(r => {
            console.log(r)
            if(r.data.response) {
                // Found errors
                let errors = r.data.response;
                const all = [];
                for (const error of Object.keys(errors)) {
                    let detailedErrors = errors[error];
                    detailedErrors.forEach(v => {
                        all.push(v)
                    });
                }
                setErrors(all)
            }
            else {
                // Proccess
                setErrors([]);
            }
        })
    }
    return (
        <>
            <div>Register Page</div>
            <form onSubmit={e => {
                e.preventDefault();
                postToServer();
            }}>
                <input type="text" onChange={e => setId(e.target.value)} placeholder="id" />
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder="email" />
                <input type="text" onChange={e => setPassword(e.target.value)} placeholder="password" />
                <input type="submit" />
                {errors.map(v => (
                    <div className="error">{v}</div>
                ))}
            </form>
        </>
    )
}