import AuthService from '../services/AuthService';
import DateService from "../services/DateService";
import {useEffect, useState} from "react";
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DescriptionIcon from '@material-ui/icons/Description';
import TodayIcon from '@material-ui/icons/Today';
import {Tooltip} from "@material-ui/core";
import GlobalsService from "../services/GlobalsService";
import {Link} from 'react-router-dom';
import axios from "axios";
import { withNamespaces } from 'react-i18next';

function Dashboard({t}) {
    const [date, setDate] = useState(new Date(Date.now()));
    const [overdueAssignmentsCount, setOverdueAssignmentsCount] = useState(null);
    const [overdueAssignments, setOverdueAssignments] = useState([]);

    setInterval(() => {
        setDate(() => new Date(Date.now()))

    }, GlobalsService.settings.clockTickRate)

    useEffect(() => {
        axios.get(`${GlobalsService.baseAPIURL}/assignments/overdue`)
            .then(res => {
                const data = res.data.data.slice(0, 2);
                setOverdueAssignmentsCount(res.data.count);
                const unique = [...new Map(data.map(item =>
                    [item['email'], item])).values()];

                setOverdueAssignments(unique)
            })
    }, [])

    const user = AuthService.getUser();
    return (
        <div className="w-full h-full">
            <div className="top-bar pb-8 font-semibold text-xl flex justify-between w-full">
                <div className="greeting">
                    {t(`dashboard.${DateService.getGreeting(date.getHours())}`)}, {user.email}.
                </div>

                <div className="date hidden md:block font-normal">
                    {date.getUTCDate()} ב{t(`months.${date.getUTCMonth()}`)}, {date.getFullYear()} | {date.getHours()}:{('0'+date.getMinutes()).slice(-2)}
                </div>
            </div>

            <div className="data w-full h-full">

                <div className="right-side w-1/2 h-full">
                    <div className="w-11/12 p-6 rounded-lg flex h-1/3 bg-white shadow-xl">
                        <div className="left w-1/2 h-full flex flex-col justify-between">
                            <div>
                                <p className="font-semibold text-red-400">
                                    {t('dashboard.assignmentsOverdue')}
                                </p>
                                <p className="text-sm">
                                    {t('dashboard.from')}{overdueAssignments && overdueAssignments.map((assignment, index) => `${assignment.user.email}`) } {t('dashboard.andMore')}
                                </p>
                            </div>

                            <Link className="mt-auto w-1/2 mb-0" to="/assignments/overdue">
                                <button className="review-btn w-full py-2 outline-none text-white rounded-full">{t('dashboard.review')}</button>
                            </Link>
                        </div>

                        <div className={"right w-3/12 h-full flex justify-center items-center" + (GlobalsService.settings.isRtl ? ' mr-auto': ' ml-auto')}>
                            <div className="title font-semibold text-3xl">
                                {overdueAssignmentsCount}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

{/* 
            <div className="data-flow flex flex-col md:flex-row mt-4 w-full h-full">
                <div className="left-side flex flex-col h-full w-full md:w-1/2 ">
                    <div className="assignments-overdue flex p-6 w-full h-full">
                        <div className="left-side flex flex-col w-1/2 h-5/6 md:h-full">
                            <div className="title font-semibold text-xl">{t('dashboard.assignmentsOverdue')}</div>
                            <div className="by text-lg"></div>
                            
                        </div>

                        <div >
                            <div className="assignment-count font-normal text-red-400 text-4xl">{}</div>
                        </div>
                    </div>

                    <div className="bottom w-full h-full justify-evenly mt-10 md:my-10 flex flex-grow">
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
            </div> */}
        </div>
    );

}

export default withNamespaces()(Dashboard);