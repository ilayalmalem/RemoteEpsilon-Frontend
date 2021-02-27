import axios from "axios";
import AuthService from "./AuthService";

const GlobalsService = {
    baseAPIURL: 'http://127.0.0.1:8000/api',
    settings: {
        isRtl: false,
        clockTickRate: 10000,
        lng: "en"
    }
}

axios.defaults.headers.common['Authorization'] = `Bearer ${AuthService.authToken()}`;
export default GlobalsService;