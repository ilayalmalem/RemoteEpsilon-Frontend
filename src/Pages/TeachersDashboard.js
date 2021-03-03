import AuthService from "../services/AuthService";
import DateService from "../services/DateService";
import {useEffect, useState} from "react";
import GlobalsService from "../services/GlobalsService";
import { withNamespaces } from "react-i18next";

function TeachersDashboard({t}) {
    const [date, setDate] = useState(new Date(Date.now()));
    
    
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(() => new Date(Date.now()))
    
        }, GlobalsService.settings.clockTickRate)

        return () => {
            clearInterval(timer)
        };
    }, [])

    const user = AuthService.getUser();

    return (
        <div>
            <div className="top-bar font-semibold text-xl flex justify-between w-full">
                <div className="greeting">
                    {DateService.getGreeting(date.getHours())}, {user.email}.
                </div>
                <div className="date hidden md:block font-normal">
                    {date.getUTCDate()} {t('months.of')}{DateService.toMonth(date.getUTCMonth())}, {date.getFullYear()} | {date.getHours()}:{('0'+date.getMinutes()).slice(-2)}
                </div>
            </div>
        </div>
    )

}

export default withNamespaces()(TeachersDashboard);