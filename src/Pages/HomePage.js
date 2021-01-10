import illustration from "../assets/main_illustration.svg";
import {useRef} from "react";


export default function HomePage(props) {
    return (
        <div className="home-page text-white">
            <div className="content-wrapper flex w-full h-full">
                <div className="left-content h-4/6 flex flex-col justify-center w-1/2">
                    <div id="headline">
                        Rediscover Remote Learning.
                    </div>
                    <div id="subheadline">
                        We at remote epsilon try to make the remote learning experience just as fun as being in class.
                    </div>

                    <button onClick={() => {
                        props.scrollTo.current.scrollIntoView({
                            behavior: "smooth"
                        })
                    }} id="cta">Get Started
                    </button>
                </div>

                <div className="right-side flex justify-end items-start w-1/2">
                    <img className="w-10/12" src={illustration} alt=""/>
                </div>
            </div>
            {/*<div id="app">*/}
            {/*    <div id="app-content">*/}
            {/*        <div id="left-content">*/}
            {/*            <div id="headline">*/}
            {/*                Rediscover Remote learning.*/}
            {/*            </div>*/}
            {/*            <div id="subheadline">*/}
            {/*                We at remote epsilon try to make the remote learning expirience just as fun as being in class.*/}
            {/*            </div>*/}


            {/*        <div id="right-content">*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}
        </div>
    )
}