import {createMuiTheme, TextField, ThemeProvider, withStyles} from "@material-ui/core";
import GlobalsService from "../services/GlobalsService";
import {useRef, useState} from "react";
import axios from "axios";
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

function AddAssignment(props) {
    const appDir = GlobalsService.settings.isRtl ? 'rtl' : 'ltr';
    const ltrTheme = createMuiTheme({ direction: "ltr" });
    const rtlTheme = createMuiTheme({ direction: "rtl" });
    const {classes} = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [toClass, setToClass] = useState('');
    const [date, setDate] = useState(new Date().toJSON().slice(0,16));

    const [titleErrors, setTitleErrors] = useState(null);
    const [descriptionErrors, setDescriptionErrors] = useState(null);
    const [dateErrors, setDateErrors] = useState(null);
    const history = useHistory();

    const upload = () => {
        const data = {
            title: name,
            description: description,
            classroom_id: parseInt(toClass),
            until_date: date
        }

        axios.post(`${GlobalsService.baseAPIURL}/assignments/create`, data)
            .then(res => {
                console.log(res.data);
                setTitleErrors(null);
                setDescriptionErrors(null);
                setDateErrors(null);
                history.push('/');
            })
            .catch(err => {
                console.log(err.response.data.errors)
                const {title, classroom_id, description, until_date} = err.response.data.errors || [];
                setTitleErrors(Array.isArray(title) ? title.map(v => v) : '');
                setDescriptionErrors(Array.isArray(description) ? description.map(v => v) : '');
                setDateErrors(Array.isArray(until_date) ? until_date.map(v => v) : '');
            })
    }

    return (
        <ThemeProvider theme={GlobalsService.settings.isRtl ? rtlTheme : ltrTheme}>
            <div isRtl={appDir} className="flex flex-col h-full justify-between">
                <label className="font-bold text-xl" htmlFor="input1">יצירת מטלה</label>
                <TextField
                    variant="outlined"
                    fullWidth
                    itemID="input1"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    InputProps={{
                        dir: appDir,
                        classes: {
                            notchedOutline: titleErrors === null ? classes.notchedOutline : classes.errorOutline
                        }
                    }}
                    className={classes.textField}
                    label="שם מטלה"
                    InputLabelProps={{
                        style: {
                            color: '#000',
                        },
                        dir: appDir,
                    }}

                    id="custom-css-outlined-input"
                />
                <div className="error text-red-500">{titleErrors}</div>
                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    InputProps={{
                        dir: appDir,
                        classes: {
                            notchedOutline: descriptionErrors === null ? classes.notchedOutline : classes.errorOutline
                        }
                    }}
                    className={classes.textField}
                    label="תיאור המטלה"
                    InputLabelProps={{
                        style: {
                            color: '#000',
                        },
                        dir: appDir,
                    }}

                    id="custom-css-outlined-input"
                />
                <div className="error text-red-500">{descriptionErrors}</div>

                <TextField
                    variant="outlined"
                    fullWidth
                    onChange={e => setToClass(e.target.value)}
                    value={toClass}
                    InputProps={{
                        dir: appDir,
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                    className={classes.textField}
                    label="כיתות"
                    InputLabelProps={{
                        style: {
                            color: '#000',
                        },
                        dir: appDir,
                    }}

                    id="custom-css-outlined-input"
                />
                <TextField
                    id="date"
                    label="תאריך אחרון להגשה"
                    type="datetime-local"
                    onChange={e => setDate(e.target.value)}
                    defaultValue={new Date().toJSON().slice(0,16)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <div className="text-red-500">{dateErrors}</div>
                <button className="w-full main_button" onClick={upload}>צור</button>
            </div>
        </ThemeProvider>
    );
}

export default withStyles(styles)(AddAssignment);