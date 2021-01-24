import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import GlobalsService from "../services/GlobalsService";
import TranslationService from "../services/TranslationService";

export default function AssignmentPage() {
    const {id} = useParams();
    const [assignment, setAssignment] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(`${GlobalsService.baseAPIURL}/assignment/${id}`)
            .then(res => {
                setAssignment(res.data)
            })
            .catch(err => {
                setError('Not authorized')
                return null;
            })

    }, [])

    return (
        <>
            {error ? (
                <div>{TranslationService.get('You are not authorized to access this assignment.')}</div>
            ) : assignment && (
                <div className="top-bar flex items-center justify-between w-full">
                    <div className="title font-bold text-xl">
                        {assignment.title}
                    </div>
                    <div>
                        <span className="font-semibold">{TranslationService.get('assignment')}</span> מ{assignment.user.email}
                    </div>
                </div>
            )}
        </>
    )
}