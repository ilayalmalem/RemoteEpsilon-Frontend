import {useEffect, useState} from "react";
import axios from "axios";
import GlobalsService from "../services/GlobalsService";
import TranslationService from "../services/TranslationService";
import {Link} from "react-router-dom";


export default function AssignmentsOverdue(props) {

    const [assignments, setAssignments] = useState(null);


    useEffect(() => {
        axios.get(`${GlobalsService.baseAPIURL}/assignments/overdue`)
            .then(res => {
                setAssignments(res.data.data);
            })
    }, []);

    return (
        <div className="w-full h-full">
            <p className="font-bold text-2xl">
                מטלות באיחור
            </p>
            <br/>
            <div className="assignments w-full flex-wrap h-full flex justify-between">
                {(assignments && assignments.map) ? assignments.map(assignment => {
                    return (
                        <div className="w-5/12 flex justify-between border-2 mb-10 shadow-md" style={{height: '40%'}}>
                            <div className="left p-5 w-7/12 h-full flex flex-col">
                                <div className="title mb-2 text-lg font-semibold">
                                    {assignment.title}
                                </div>

                                <div className="classroom text-indigo-600">
                                    {assignment.classroom.name}
                                </div>
                                <div>
                                    <span className="font-bold">{TranslationService.get('assignment')}</span> מ{assignment.owner.email}
                                </div>
                                <div className="bottom-section mt-auto flex flex-col">
                                    <Link to={"/assignment/" + assignment.id}>
                                        <div className="cta-sm w-1/3 text-center">צפה</div>
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="right w-5/12 h-full">
                                <img className="w-full h-full" src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg" alt="תמונת מטלה"/>
                            </div>

                        </div>
                    )
                }) : 'טוען..'}
            </div>
        </div>
    )
}