import AuthService from '../services/AuthService';
import DateService from "../services/DateService";
import {useState} from "react";
import '../Styles/dashboard.scss';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DescriptionIcon from '@material-ui/icons/Description';
import TodayIcon from '@material-ui/icons/Today';
import {Tooltip} from "@material-ui/core";
import GlobalsService from "../services/GlobalsService";
import {Link} from 'react-router-dom';

export default function Dashboard() {
    const [date, setDate] = useState(new Date(Date.now()));

    setInterval(() => {
        setDate(() => new Date(Date.now()))

    }, GlobalsService.settings.clockTickRate)

    const user = AuthService.getUser();
    return (
        // Student Dashboard
        <>
            <div className="top-bar font-semibold text-2xl flex justify-between w-full">
                <div className="greeting">
                    {DateService.getGreeting(date.getHours())}, {user.email}.
                </div>
                <div className="date">
                    {date.getUTCDate()} ב{DateService.toMonth(date.getUTCMonth())}, {date.getFullYear()} | {date.getHours()}:{('0'+date.getMinutes()).slice(-2)}
                </div>
            </div>

            <div className="data-flow flex mt-4 w-full h-full">
                <div className="left-side flex flex-col h-full w-6/12">
                    <div className="assignments-overdue flex p-6 w-full h-3/6">
                        <div className="left-side flex flex-col w-1/2 h-full">
                            <div className="title font-semibold text-xl">מטלות באיחור</div>
                            <div className="by text-lg">מנחמה יעיש, רועי ברכה ועוד.</div>
                            <Link className="mt-auto w-1/2 mb-0" to="/assignments/overdue">
                                <button className="review-btn w-full py-2 outline-none text-white rounded-full">צפה</button>
                            </Link>
                        </div>

                        <div className="right-side w-3/12 mr-auto h-full flex justify-center items-center">
                            <div className="assignment-count font-normal text-red-400 text-4xl">7</div>
                        </div>
                    </div>

                    <div className="bottom w-full justify-evenly my-10 flex flex-grow">
                        <Link className="shortcut-block flex-grow" to="/chats">
                            <Tooltip placement="bottom" aria-label="add" title="צ׳אטים">
                                <div className="w-full h-full flex-grow flex justify-center items-center text-4xl">
                                    <QuestionAnswerIcon style={{ fontSize: 60 }} />
                                </div>
                            </Tooltip>
                        </Link>

                        <Link className="shortcut-block mx-5 flex-grow" to="/files">
                            <Tooltip placement="bottom" aria-label="add" title="קבצים">
                                <div className="w-full h-full flex-grow flex justify-center items-center text-4xl">
                                    <DescriptionIcon style={{ fontSize: 60 }} />
                                </div>
                            </Tooltip>
                        </Link>

                        <Link className="shortcut-block flex-grow" to="/schedule">
                            <Tooltip placement="bottom" aria-label="add" title="לוח שנה">
                                <div className="w-full h-full flex flex-grow justify-center items-center text-4xl">
                                    <TodayIcon style={{ fontSize: 60 }} />
                                </div>
                            </Tooltip>
                        </Link>


                    </div>
                </div>

                <div className="right-side w-1/2 h-full">

                </div>
            </div>
        </>
    );

}