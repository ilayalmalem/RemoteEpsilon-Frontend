import AuthService from '../services/AuthService';
import DateService from "../services/DateService";
import { useEffect, useState } from "react";
import { Tooltip } from "@material-ui/core";
import GlobalsService from "../services/GlobalsService";
import { Link } from 'react-router-dom';
import axios from "axios";
import { withNamespaces } from 'react-i18next';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProgressProvider from '../components/ProgressProvider';

function Dashboard({ t }) {
    const [date, setDate] = useState(new Date(Date.now()));
    const [overdueAssignmentsCount, setOverdueAssignmentsCount] = useState(null);
    const [overdueAssignments, setOverdueAssignments] = useState([]);
    const [valueEnd, setValueEnd] = useState(0);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('remote_epsilon_user')).user);
    const totalAssetSize = AuthService.getAssetsSize();

    useEffect(async () => {
        const res = await axios.get(`/assignments/overdue`)
        const data = res.data.data.slice(0, 2);
        setOverdueAssignmentsCount(res.data.count);
        const unique = [...new Map(data.map(item =>
            [item['email'], item])).values()];
        setOverdueAssignments(unique);

        const storageLimit = 10737418240 / 10; // IN BYTES (!!)
        setValueEnd(((totalAssetSize / storageLimit) * 100).toFixed(1))
        
        const timer = setInterval(() => {
            setDate(() => new Date(Date.now()))

        }, GlobalsService.settings.clockTickRate)
        
        return () => {
            clearInterval(timer)
        }
    }, [])


    return (
        <div className="w-full h-full">
            <div className="top-bar pb-8 font-semibold text-xl flex justify-between w-full">
                <div className="greeting">
                    {t(`dashboard.${DateService.getGreeting(date.getHours())}`)}, {user.email}.
                </div>

                <div className="date hidden md:block font-normal">
                    {date.getUTCDate()} {t('months.of')}{t(`months.${date.getUTCMonth()}`)}, {date.getFullYear()} | {date.getHours()}:{('0' + date.getMinutes()).slice(-2)}
                </div>
            </div>

            <div className="data w-full h-full">
                <div className="right-side w-1/2 h-full">
                    <div className="w-11/12 p-6 rounded-lg flex h-1/3 bg-white shadow-xl">
                        <div className="left w-9/12 h-full flex flex-col justify-between">
                            <div>
                                <p className="font-semibold text-red-400">
                                    {t('dashboard.assignmentsOverdue')}
                                </p>
                                <p className="text-sm w-3/4">
                                    {t('dashboard.from')}{overdueAssignments && overdueAssignments.map((assignment, index) => `${assignment.user.email}`)} {t('dashboard.andMore')}
                                </p>
                            </div>

                            <Link className="mt-auto w-1/2 mb-0" to="/assignments/overdue">
                                <button className="review-btn w-full text-sm py-2 outline-none text-white rounded-full">{t('dashboard.review')}</button>
                            </Link>
                        </div>

                        <div className={"right w-3/12 h-full flex justify-center items-center" + (GlobalsService.settings.isRtl ? ' mr-auto' : ' ml-auto')}>
                            <div className="title font-semibold text-3xl">
                                {overdueAssignmentsCount}
                            </div>
                        </div>
                    </div>

                    <div className="w-11/12 p-6 h-1/4 justify-between flex bg-white shadow-xl rounded-lg mt-6">
                        <div className="left w-1/2">
                            <p className="font-bold">
                                {t('dashboard.storagePool')}
                            </p>

                            <p className="text-sm">
                                {(totalAssetSize / 1000000000).toString().slice(0, 4)}GB/1GB
                            </p>
                        </div>

                        <div className="right  flex justify-end items-end w-1/3 h-full">
                            <ProgressProvider valueStart={10} valueEnd={valueEnd}>
                                {value => <CircularProgressbar className="h-full" value={value} text={`${value}%`} />}
                            </ProgressProvider>

                        </div>

                    </div>

                    <div className="w-11/12 h-1/5 p-6 bg-white shadow-xl rounded-lg mt-6">
                        <div className="left">
                            <p className="font-bold">
                                75 new messages
                            </p>
                            <div className="text-sm">
                                From 7 chats
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );

}

export default withNamespaces()(Dashboard);