import { Icon } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { withNamespaces } from 'react-i18next';

function Storage({ t }) {

    const [assets, setAssets] = useState();

    useEffect(async () => {
        const response = await axios.get('/assets');
        setAssets(response.data);
    }, [])

    return (
        <div className="w-full h-full">
            <div className="header text-2xl font-bold">
                {t('storage.storage')}
            </div>

            <div className="assets mt-4 flex flex-wrap justify-between items-start w-full h-full">
                {assets && assets.map(asset => {
                    let createdAtDate = new Date(asset.created_at);
                    let updatedAt = new Date(asset.updated_at);

                    return (
                        <div className="asset mb-10 flex flex-col p-5 bg-white shadow-xl" style={{width: "40%", height: "33vh"}}>
                            <div className="topbar w-full flex items-center justify-between">
                                <p className="font-semibold text-lg">{asset.name.slice(0, 24) + (asset.name.length > 24 ? "... " : "")}</p>
                                {asset.is_private ? <Icon>lock_outline</Icon> : <Icon>lock_open</Icon>}
                            </div>
                            <p className="text-sm mt-2 font-light">{asset.description || t('storage.noDescription')}</p>

                            <div className="bottom h-full flex justify-between items-end flex">
                                <button className="mt-auto button w-1/3 py-1">{t('storage.watch')}</button>
                                <div className="data text-sm items-end flex flex-col">
                                    <p className="font-bold">{asset.extension.toUpperCase()}</p>
                                    <p>{t('storage.createdAt')}{createdAtDate.getUTCDate()} {t('months.of')}{t(`months.${createdAtDate.getUTCMonth()}`)}, {createdAtDate.getFullYear()}</p>
                                    <p>{t('storage.updatedAt')}{updatedAt.getUTCDate()} {t('months.of')}{t(`months.${updatedAt.getUTCMonth()}`)}, {updatedAt.getFullYear()}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default withNamespaces()(Storage);