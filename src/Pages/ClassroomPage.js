import React from 'react'
import { useParams } from 'react-router-dom'

export default function ClassroomPage() {
    const {id} = useParams();

    return (
        <div>
            Classroom {id} details
        </div>
    )
}
