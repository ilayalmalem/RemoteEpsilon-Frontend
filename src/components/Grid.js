import React from 'react'
import { withNamespaces } from 'react-i18next'

function Grid({ t, gridTitle, data, ContainerElement }) {
    return (
        <div className="w-full h-full">
            <div className="header text-2xl font-bold">
                {t(gridTitle)}
            </div>

            <div className="grid-items mt-4 flex flex-wrap justify-between items-start w-full h-full">
                {data && data.map(v => (
                    <div key={v.id} className="grid-item mb-10 flex flex-col p-5 bg-white shadow-xl" style={{width: "40%", height: "33vh"}}>
                        <ContainerElement data={v} />
                    </div>
                ))}
            </div>
        </div>

    )
}

export default withNamespaces()(Grid);