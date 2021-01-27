import {
    createMuiTheme,
    ThemeProvider,
} from '@material-ui/core';
import logo from '../assets/logo.svg';
import Globals from "../services/GlobalsService";
import Form from "../components/Form";

const ltrTheme = createMuiTheme({ direction: "ltr" });
const rtlTheme = createMuiTheme({ direction: "rtl" });
const isRtl = Globals.settings.isRtl;

function LoginPage(props) {
    return (
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
            <div dir={isRtl ? 'rtl' : 'ltr'} className="wrapper flex justify-center w-full" dir="ltr">
                <div
                    className="flex bg-white shadow-xl flex-col justify-start border-2 w-full md:w-5/12 xl:w-3/12 p-6">
                    <div className="logo flex lg:mb-auto justify-center">
                        <img src={logo} className="w-2/12"/>
                    </div>
                    <div className="w-full lg:mb-auto mt-8">
                        <Form isRtl={isRtl} setLoggedIn={props.setLoggedIn} />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}

export default LoginPage;