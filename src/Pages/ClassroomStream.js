import React from 'react'
import { withNamespaces } from 'react-i18next';
import { useParams } from 'react-router-dom'

function ClassroomStream({ t }) {
    const {id} = useParams();

    return (
        <div>
            Stream for classroom {id}
        </div>
    )
}

export default withNamespaces()(ClassroomStream);