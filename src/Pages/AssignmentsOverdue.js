import {useEffect, useState} from "react";
import axios from "axios";
import GlobalsService from "../services/GlobalsService";
import AssignmentShow from "../components/AssignmentShow";


export default function AssignmentsOverdue() {

    const [assignments, setAssignments] = useState();

    useEffect(() => {
        axios.get(`/assignments/overdue`)
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
            <AssignmentShow assignments={assignments}/>
        </div>
    )
}