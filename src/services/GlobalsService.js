import axios from "axios";
import AuthService from "./AuthService";

const availbleLanguages = [
    {
        "name": "english",
        "langCode": "EN",
        "countryCode": "us",
        "dir": "false"
    },
    {
        "name": "hebrew",
        "langCode": "HE",
        "countryCode": "il",
        "dir": "true"
    },
    {
        "name": "arabic",
        "langCode": "AR",
        "countryCode": "jo",
        "dir": "true"
    },
    {
        "name": "france",
        "langCode": "FR",
        "countryCode": "fr",
        "dir": "false"
    }
];

const GlobalsService = {
    baseAPIURL: 'http://127.0.0.1:8000/api',
    settings: {
        isRtl: localStorage.getItem('remote_epsilon_is_rtl') === 'true' ? true : false,
        clockTickRate: 10000,
        lng: localStorage.getItem('remote_epsilon_language') || 'he',
        languageDetails: () => availbleLanguages.find(language => language.langCode.toLowerCase() === localStorage.getItem('remote_epsilon_language').trim())
    },
    availbleLanguages: availbleLanguages,
    changeLanguage: (lng, isRtl) => {
        localStorage.setItem('remote_epsilon_language', lng);
        localStorage.setItem('remote_epsilon_is_rtl', isRtl)
    }
}

axios.defaults.headers.common['Authorization'] = `Bearer ${AuthService.authToken()}`;
axios.defaults.baseURL = 'http://127.0.0.1:8000/api'; 
export default GlobalsService;