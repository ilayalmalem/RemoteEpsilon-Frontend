import Flag from "react-flags";
import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import GlobalsService from '../services/GlobalsService';
import { Icon, MenuItem, Select, Tooltip } from "@material-ui/core";


function Settings({ t, i18n, changeDir }) {
    const languages = GlobalsService.availbleLanguages;
    const [selectedLanguage, setSelectedLanguage] = useState(GlobalsService.settings.languageDetails().langCode);

    const handleChange = (value, dir) => {
        i18n.changeLanguage(value);
        changeDir(dir == 'true')
        GlobalsService.changeLanguage(value, dir)
        setSelectedLanguage(value)
    }

    return (
        <div className="flex flex-col w-full justify-between">
            <p className="font-bold text-xl">
                <div className="flex items-center">
                    <Tooltip title={t('settings.languageHelp')}>
                        <Icon className="cursor-pointer" style={{fontSize: '32px'}}>help_sharp</Icon>
                    </Tooltip>
                    <p className="px-4">{t('settings.language')}</p>
                </div>
            </p>
            <div className="languages mt-4 flex justify-between w-full">
                {languages.map(language => (
                    <Tooltip title={t(`settings.${language.name}`)}>
                        <div className={"border-2 p-6 cursor-pointer shadow-lg" + (selectedLanguage == language.langCode ? ' border-indigo-300 bg-white' : ' ')} key={language.name} onClick={() => handleChange(language.langCode.toLowerCase(), language.dir)}>
                            <img src={`https://www.countryflags.io/${language.countryCode}/flat/64.png`} />
                        </div>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}

export default withNamespaces()(Settings);