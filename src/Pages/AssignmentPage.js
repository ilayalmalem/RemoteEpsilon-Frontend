import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import GlobalsService from "../services/GlobalsService";
import TranslationService from "../services/TranslationService";
import { Tooltip } from "@material-ui/core";

export default function AssignmentPage() {
    const {id} = useParams();
    const [assignment, setAssignment] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        axios.get(`/assignment/${id}`)
            .then(res => {
                setAssignment(res.data)
                console.log(res.data)
            })
            .catch(err => {
                setError('Not authorized')
                return null;
            })

    }, [])

    function downloadAll(assets) {
        assets.forEach(asset => {
            window.open(`${GlobalsService.baseAPIURL}/download/${asset.id}`);
        })
    }

    return (
        <>
            {error ? (
                <div>{TranslationService.get('You are not authorized to access this assignment.')}</div>
            ) : assignment && (
                <>
                    <div className="top-bar flex items-center justify-between w-full">
                        <div className="title font-bold text-xl">
                            {assignment.title}
                        </div>
                        <div>
                            <span className="font-semibold">{TranslationService.get('assignment')}</span> מ{assignment.user.email}
                        </div>
                    </div>

                    <div className="main w-full mt-4 h-5/6 flex">    
                        <div style={{backgroundColor: '#000428'}} className="files-container p-6 w-1/4">
                            <div className="files-title font-semibold text-xl text-white">
                                קבצים מצורפים
                            </div>
                            <div className="files overflow-scroll mt-6 h-full flex flex-col">
                                {assignment.assets.map((file) => (
                                    <Tooltip placement="left" key={file.path} title={file.name}>
                                        <a className="file h-12 flex justify-between items-center p-2 rounded-md" style={{backgroundColor: '#B9FCFF'}} target="_blank" href={`${GlobalsService.baseAPIURL}/download/${file.id}`}>
                                            <p className="text-sm">{file.name.slice(0, 18) + (file.name.length > 18 ? '...' : '')}</p>
                                            <p className="extension text-sm font-semibold">{file.extension.toUpperCase()}</p>
                                        </a>
                                    </Tooltip>
                                ))}
                            </div>
                            <a href="#"  target="_blank" onClick={e => {
                                e.preventDefault();
                                downloadAll(assignment.assets)
                            }}>all</a>
                        </div>
                        <div className="content w-1/2 shadow-2xl bg-white">

                        </div>

                        <div style={{backgroundColor: '#B9FCFF'}} className="response-info flex-grow  shadow-xl">

                        </div>
                    </div>

                </>
            )}
        </>
    )
}