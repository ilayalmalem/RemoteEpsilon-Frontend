import React from 'react'

export default function Event({event}) {
    return (
        <div className="w-1/3 shadow-xl h-2/5">
            <div className="top-bar p-3 w-full flex justify-between">
                <p className="font-semibold">
                    {event.name}
                </p>
                <p>
                    {event.event_start}
                </p>
            </div>
        </div>
    )
}
