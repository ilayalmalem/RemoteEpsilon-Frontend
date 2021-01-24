import axios from "axios";
import AuthService from "./AuthService";

const Globals = {
    baseAPIURL: 'http://127.0.0.1:8000/api',
    settings: {
        isRtl: true,
        clockTickRate: 10000
    }
}

axios.defaults.headers.common['Authorization'] = `Bearer ${AuthService.authToken()}`;


export default Globals;