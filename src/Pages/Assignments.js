import AuthService from "../services/AuthService";
import {useEffect, useState} from "react";
import axios from "axios";
import GlobalsService from "../services/GlobalsService";
import TranslationService from "../services/TranslationService";
import {Link} from "react-router-dom";


export default function Assignments(props) {
    const user = AuthService.getUser();

    return user.role == 'student' ? <ForStudents user={user} /> : <ForTeachers user={user} />;
};

function ForStudents(props) {
    const {user} = props;
    return (
        <div>
            For students
        </div>
    )
}

function ForTeachers(props) {

    const [assignments, setAssignments] = useState();
    const {user} = props;

    useEffect(() => {
        axios.get(`${GlobalsService.baseAPIURL}/${user.id}/assignments`)
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