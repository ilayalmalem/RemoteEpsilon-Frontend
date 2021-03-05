import AuthService from "../services/AuthService";
import {useEffect, useState} from "react";
import axios from "axios";
import GlobalsService from "../services/GlobalsService";
import TranslationService from "../services/TranslationService";
import {Link} from "react-router-dom";
import AssignmentShow from "../components/AssignmentShow";


export default function Assignments(props) {
    const user = AuthService.getUser();

    return user.role == 'student' ? <ForStudents user={user}/> : <ForTeachers user={user}/>;
};

function ForStudents() {
    const [assignments, setAssignments] = useState();

    useEffect(() => {
        axios.get(`/assignments/all`)
            .then(r => {
                setAssignments(r.data)
            });
    }, [])

    return (
        <div className="w-full h-full">
            <p className="font-bold text-2xl">
                מטלות
            </p>
            <br/>
            <AssignmentShow assignments={(assignments && assignments.data) ? assignments.data : {}}/>
        </div>
    )
}

function ForTeachers(props) {

    const [assignments, setAssignments] = useState();
    const {user} = props;

    useEffect(() => {
        axios.get(`/${user.id}/assignments`)
            .then(r => setAssignments(r.data));
    }, [])

    return (
        <div>
            {assignments && (
                <div>
                    {TranslationService.get("you have")} {assignments.length} {TranslationService.get('assignments')}
                    <br/>
                    <Link to="/assignments/add">הוסף מטלה</Link>
                </div>
            )}
        </div>
    )
}