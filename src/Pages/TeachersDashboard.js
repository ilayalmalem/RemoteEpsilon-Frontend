import AuthService from "../services/AuthService";
import DateService from "../services/DateService";
import {useState} from "react";
import GlobalsService from "../services/GlobalsService";

export default function TeachersDashboard(props) {
    const [date, setDate] = useState(new Date(Date.now()));

    setInterval(() => {
        setDate(() => new Date(Date.now()))

    }, GlobalsService.settings.clockTickRate)

    const user = AuthService.getUser();

    return (
        <div>
            <div className="top-bar font-semibold text-xl flex justify-between w-full">
                <div className="greeting">
                    {DateService.getGreeting(date.getHours())}, {user.email}.
                </div>
                <div className="date hidden md:block font-normal">
                    {date.getUTCDate()} ב{DateService.toMonth(date.getUTCMonth())}, {date.getFullYear()} | {date.getHours()}:{('0'+date.getMinutes()).slice(-2)}
                </div>
            </div>
        </div>
    )

}