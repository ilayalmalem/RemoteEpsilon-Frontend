import AuthService from "../services/AuthService";
import {IconButton, InputAdornment, TextField, Tooltip, withStyles} from "@material-ui/core";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import {useState} from "react";
import {useHistory} from "react-router-dom";

const styles = theme => ({
    notchedOutline: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3f51b5',
            },
        },
        borderWidth: "1px",
        borderColor: "rgba(0, 0, 0, 0.23)"
    },
    errorOutline: {
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#3f51b5',
            },
        },
        borderWidth: "2px",
        borderColor: "red"
    }
})


function Form(props) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);
    const history = useHistory();
    const [idErrors, setIdErrors] = useState('');
    const [passwordErrors, setPasswordErrors] = useState('');
    const [allErrors, setAllErrors] = useState('');

    const handleSubmit = async (e, id, password) => {
        e.preventDefault();

        // This in production will be replaced to an api call to fetch user data to be stored
        const user = {
            // name: 'עילאי דוד אלמלם',
            id: id,
            password: password,
            // email: 'ilayalmalem@gmail.com',
            // phone: '0504841222',
            // role: 'student'
        };

        const authorized = await AuthService.authenticate(user)
                console.log(authorized)
                if(authorized.state == true) {
                    props.setLoggedIn(true);
                    history.push({
                        pathname: '/dashboard',
                        state: {
                            user: user
                        }
                    });
                    setIdErrors('');
                    setPasswordErrors('');
                    setAllErrors('');
                }
                else {
                    setIdErrors(authorized.errors.id);
                    setPasswordErrors(authorized.errors.password);
                    setAllErrors(authorized.errors.all);
                }
            }
    const appDir = props.isRtl ? 'rtl' : 'ltr';
    const {classes} = props;
    return (
        <form className={classes.root}>
            <Tooltip title="מספרים בלבד , 9 ספרות." placement="right" aria-label="add">
                <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        dir: appDir,
                        classes: {
                            notchedOutline: idErrors == '' ? classes.notchedOutline : classes.errorOutline
                        }
                    }}
                    className={classes.textField}
                    onChange={e => setId(e.target.value)}
                    value={id}
                    label="תעודת זהות"
                    InputLabelProps={{
                        style: {
                            color: '#000',
                        },
                        dir: appDir,
                    }}

                    id="custom-css-outlined-input"
                    type="number"
                />
            </Tooltip>
            <div dir={appDir} className="text-red-400 text-sm ">
                {idErrors}
            </div>
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
                    dir: appDir,
                    classes: {
                        notchedOutline: passwordErrors == '' ? classes.notchedOutline : classes.errorOutline
                    },
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
            <div dir={appDir} className="text-red-400 text-sm">
                {passwordErrors}
            </div>
            <div dir={appDir} className="text-red-400 text-sm ">
                {allErrors}
            </div>
            <label dir={appDir} className="inline-flex items-center mt-5 w-full">
                <input type="checkbox" className="form-checkbox h-5 w-5"
                       onChange={() => setRememberMe(!rememberMe)} checked={rememberMe}/><span
                className={(appDir == 'rtl' ? 'mr-2' : 'ml-2 ') + " text-black text-sm"}>זכור אותי</span>
            </label>
            {/*</div>*/}

            <button disabled={(id.length != 9 || password.length <= 4) ? true : false}
                    onClick={e => handleSubmit(e, id, password)}
                    className={"w-full outline-none bg-red-400 mt-4 h-10 text-white" +
                    "" + ((id.length != 9 || password.length <= 4) ? ' opacity-50' : ' opacity-100')}>התחבר
            </button>

        </form>
    )
}

export default withStyles(styles)(Form);