import AuthService from '../services/AuthService';


export default function Dashboard() {
    const user = AuthService.getUser();
    return (
        <div>
            Hello, {user.name}
        </div>
    );

}