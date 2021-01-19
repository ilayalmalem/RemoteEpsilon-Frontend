import {useState} from 'react';
import {
    IconButton,
    InputAdornment,
    TextField, Tooltip, withStyles,
} from '@material-ui/core';
import {Visibility, VisibilityOff} from "@material-ui/icons";
import '../Styles/authentication.scss';
import logo from '../assets/logo.svg';
import {useHistory} from "react-router-dom";
import AuthService from "../services/AuthService";

const styles = theme => ({
    root: {
        '& .MuiInputBase-input': {
            color: 'black', // Text color
        },

        '& .MuiInput-underline:before': {
            borderBottomColor: 'gray', // Semi-transparent underline
        },
        '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#3f51b5', // Solid underline on hover
        },
    },

    textField: {
        color: '#000'
    },
    noPadding: {
        padding: 0,
        margin: 0
    }
})

function LoginPage(props) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const history = useHistory();

    const handleSubmit = (e, id, password) => {
        e.preventDefault();
        const user = {
            name: 'עילאי דוד אלמלם',
            id: 216331470,
            email: 'ilayalmalem@gmail.com',
            phone: '0504841222',
            role: 'student'
        };
        history.push({
            pathname: '/dashboard',
            state: {
                user: user
            }
        });
        // Change service
        AuthService.authenticate(user);
        props.setLoggedIn(true);
    }

    const {classes} = props;

    return (
        <div className="wrapper flex justify-center lg:h-full w-full" dir="ltr">
            <div
                className="flex bg-white shadow-xl flex-col justify-start border-2 w-full md:w-8/12 lg:w-6/12 lg:h-full xl:w-3/12 p-6">
                <div className="logo flex lg:mb-auto justify-center">
                    <img src={logo} className="w-2/12"/>
                </div>
                <div className="w-full lg:h-full lg:mb-auto mt-8">
                    <form className={classes.root}>
                        <Tooltip title="מספרים בלבד , 9 ספרות." placement="right" aria-label="add">
                            <TextField
                                variant="outlined"
                                fullWidth
                                className={classes.textField}
                                onChange={e => setId(e.target.value)}
                                value={id}
                                label="תעודת זהות"
                                InputLabelProps={{
                                    style: {color: '#000'},
                                    dir: "rtl"
                                }}

                                id="custom-css-outlined-input"
                                type="number"
                            />
                        </Tooltip>

                        <div className="h-7"></div>

                        <TextField
                            fullWidth
                            variant="outlined"
                            className={classes.textField}
                            label="סיסמה"
                            InputLabelProps={{
                                style: {color: '#000'},
                            }}
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {showPassword ? <VisibilityOff className="text-blue-400"/> :
                                                <Visibility style={{color: 'gray'}}/>}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                            id="custom-css-outlined-input"
                            type={showPassword ? "text" : "password"}
                        />
                        {/*<div className="checkbox-wrapper  flex justify-end">*/}
                        <label dir="ltr" className="inline-flex items-center mt-5">
                            <input type="checkbox" className="form-checkbox h-5 w-5"
                                   onChange={() => setRememberMe(!rememberMe)} checked={rememberMe}/><span
                            className="ml-2 text-black text-sm">זכור אותי</span>
                        </label>
                        {/*</div>*/}

                        <button disabled={(id.length != 9 || password.length <= 4) ? true : false}
                                onClick={e => handleSubmit(e, id, password)}
                                className={"w-full outline-none bg-red-400 mt-4 h-10 text-white" +
                                "" + ((id.length != 9 || password.length <= 4) ? ' opacity-50' : ' opacity-100')}>התחבר
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withStyles(styles)(LoginPage)