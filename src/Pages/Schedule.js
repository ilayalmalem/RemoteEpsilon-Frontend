import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Event from '../components/Event';
import GlobalsService from '../services/GlobalsService';

export default function Schedule() {
    const [events, setEvents] = useState();
    const [classEvents, setClassEvents] = useState();

    useEffect(async () => {
        const {data: {classroom_events, events }} = await axios.get(`${GlobalsService.baseAPIURL}/events`);
        setClassEvents(classroom_events);
        setEvents(events);
    }, [])

    return (
        <div className="w-full h-full">
            Your schedule

            {events && events.map(eve => (
                <div>{eve}</div>
            ))}
            
            Classroom events
            <div className="classroom_events flex h-full w-full">
                {classEvents && classEvents.map(eve => (
                    <Event event={eve} key={eve.id} />
                ))}
            </div>
        </div>
    )
}
