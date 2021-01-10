import illustration from "../assets/main_illustration.svg";
import {useRef} from "react";


export default function HomePage() {
    const section2 = useRef(null);
    return (
        <>
            <div id="app">
                <div id="app-content">
                    <div id="left-content">
                        <div id="headline">
                            Rediscover Remote learning.
                        </div>
                        <div id="subheadline">
                            We at remote epsilon try to make the remote learning expirience just as fun as being in class.
                        </div>

                        <button onClick={() => {
                            section2.current.scrollIntoView({
                                behavior: "smooth"
                            })
                        }} id="cta">Get Started</button>
                    </div>

                    <div id="right-content">
                        <img src={illustration} alt=""/>
                    </div>
                </div>
            </div>
            <div ref={section2} className="extender">width</div>
        </>
    )
}