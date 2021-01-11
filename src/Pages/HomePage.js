import illustration from "../assets/main_illustration.svg";
import {useRef} from "react";


export default function HomePage(props) {
    return (
        <div className="home-page text-black">
            <div className="content-wrapper flex w-full h-full">
                <div className="left-content h-4/6 flex flex-col justify-center w-1/2">
                    <div id="headline">
                        הכירו סוג חדש של למידה מרחוק.
                    </div>
                    <div id="subheadline">
                        בואו לחוות סוג חדש של למידה מרחוק. כל הכלים הדרושים במקום אחד, בכל זמן, מכל מקום במקסימום נוחות.
                    </div>

                    <button onClick={() => {
                        props.scrollTo.current.scrollIntoView({
                            behavior: "smooth"
                        })
                    }} id="cta">התחילו
                    </button>
                </div>

                <div className="right-side flex mt-3 justify-end items-start w-1/2">
                    <img className="w-10/12" src={illustration} alt=""/>
                </div>
            </div>

        </div>
    )
}