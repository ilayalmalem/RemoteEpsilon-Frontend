import axios from 'axios';
import { useEffect, useState } from 'react'
import { withNamespaces } from 'react-i18next'
import { Link } from 'react-router-dom';
import Grid from '../components/Grid';

function MyClassroomPage({ t }) {

    const [classrooms, setClassrooms] = useState();

    useEffect(async () => {
        const res = await axios.get('/classrooms');
        setClassrooms(res.data);
    }, [])

    return (
        <Grid data={classrooms} gridTitle={"classrooms.yourClassrooms"} ContainerElement={ClassroomDisplay} /> 
    )
}

export default withNamespaces()(MyClassroomPage);

function ClassroomDisplay({ data }) {
    return (
        <div>
            {data.name}

            <Link to={`/classrooms/${data.id}/stream`}>
                <button className="cta-sm text-sm">View Stream</button>
            </Link>

        </div>
    )
}
