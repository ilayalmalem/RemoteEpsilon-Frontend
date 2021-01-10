export default function GetStartedPage() {
    return (
        <div className="relative flex flex-col h-full">
            <div className="div mb-5 text-white font-bold text-xl left-0 top 0">
                Want RemoteEpsilon In Your School?
            </div>

            <div className="pricing-plans flex justify-between items-center h-full">
                <div className="pricing-plan flex flex-col relative bg-white w-3/12 h-full p-4">
                    <div className="title text-sm mb-4">
                        Basic
                    </div>
                    <div className="price text-lg mb-3">
                        <span className="pricing text-2xl font-bold"><sup>$</sup> 600</span> / Year
                    </div>
                    <div className="description text-sm">
                        300 Students per Year. <br/>
                        50 Staff per Year. <br/>
                        25GB of storage per Year. <br/>
                    </div>
                    <button style={{'backgroundColor': '#4A00E0'}}
                            className="join-btn text-white py-2 mt-auto bottom-5 w-full bg-red-400">Join now
                    </button>
                </div>

                <div className="pricing-plan expanded bg-yellow-200 flex flex-col relative bg-white w-4/12 h-full p-4">
                    <div className="title text-sm mb-4">
                        Pay as you go
                    </div>
                    <div className="price text-lg mb-3">
                        <span className="pricing text-2xl font-bold"><sup>$</sup> 2</span> / Student Per year
                    </div>
                    <div className="description text-sm">
                        2$ per Student each Year. <br/>
                        5$ per Staff each Year. <br/>
                        1$ per each 10GB of storage each Year. <br/>
                    </div>
                    <button style={{'backgroundColor': '#4A00E0'}}
                            className="join-btn text-white py-2 mt-auto bottom-5 w-full bg-red-400">Join now
                    </button>
                </div>

                <div className="pricing-plan flex flex-col relative bg-white w-3/12 h-full p-4">
                    <div className="title text-sm mb-4">
                        Advanced
                    </div>
                    <div className="price text-lg mb-3">
                        <span className="pricing text-2xl font-bold"><sup>$</sup> 800</span> / Year
                    </div>
                    <div className="description text-sm">
                        500 Students per Year. <br/>
                        100 Staff per Year. <br/>
                        50GB of storage per Year. <br/>
                    </div>
                    <button style={{'backgroundColor': '#4A00E0'}}
                            className="join-btn text-white py-2 mt-auto bottom-5 w-full bg-red-400">Join now
                    </button>
                </div>
            </div>
        </div>
    );
}