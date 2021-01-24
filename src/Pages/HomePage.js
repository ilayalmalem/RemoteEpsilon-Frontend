import illustration from "../assets/main_illustration.svg";

export default function HomePage() {
    return (
        <div className="home-page flex flex-col items-center text-black">
            <div className="content-wrapper flex h-full md:h-full w-full items-center lg:items-start">
                <div className="left-content justify-center h-4/6 flex flex-col w-full md:w-1/2">
                    <div id="headline">
                        הכירו סוג חדש של למידה מרחוק.
                    </div>
                    <div id="subheadline" className="w-full md:w-7/12">
                        בואו לחוות סוג חדש של למידה מרחוק. כל הכלים הדרושים במקום אחד, בכל זמן, מכל מקום במקסימום נוחות.
                    </div>

                    <button onClick={() => {
                        // props.scrollTo.current.scrollIntoView({
                        //     behavior: "smooth"
                        // })
                    }} className="w-full mt-8 md:w-1/4 cta">התחילו
                    </button>
                </div>

                <div className="right-side hidden md:flex mt-3 justify-end items-start w-1/2">
                    <img className="w-full md:w-10/12" src={illustration} alt=""/>
                </div>
            </div>

        </div>
    )
}