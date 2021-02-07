import TranslationService from "../services/TranslationService";
import {Link} from "react-router-dom";

export default function AssignmentShow(props) {
    const {assignments} = props;
    return (

        <div className="assignments w-full flex-wrap h-full flex justify-between">
            {(assignments && assignments.map) ? assignments.map(assignment => {
                return (
                    <div key={assignment.id} className="w-full lg:w-5/12 flex justify-between border-2 mb-10 shadow-md"
                         style={{height: '40%'}}>
                        <div className="left p-5 w-7/12 h-full flex flex-col">
                            <div className="title mb-2 text-lg font-semibold">
                                {assignment.title}
                            </div>

                            <div className="classroom text-indigo-600">
                                {assignment.classroom.name}
                            </div>
                            <div>
                                <span
                                    className="font-bold">{TranslationService.get('assignment')}</span> מ{assignment.user.email}
                            </div>
                            <div className="bottom-section mt-auto flex flex-col">
                                <Link className="w-1/3" to={"/assignment/" + assignment.id}>
                                    <div className="cta-sm text-center">צפה</div>
                                </Link>
                            </div>
                        </div>

                        <div className="right w-5/12 h-full">
                            <img className="w-full h-full"
                                 src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Donkey_in_Clovelly%2C_North_Devon%2C_England.jpg"
                                 alt="תמונת מטלה"/>
                        </div>

                    </div>
                )
            }) : 'טוען..'}
        </div>
    )
}