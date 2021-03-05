import Flag from "react-flags";
import React, { useState } from 'react'
import { withNamespaces } from 'react-i18next'
import GlobalsService from '../services/GlobalsService';
import { MenuItem, Select } from "@material-ui/core";


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
                Language
            </p>
            <div className="languages mt-4 flex justify-between w-full">
                {languages.map(language => (
                    <div className={"border-2 p-6 cursor-pointer shadow-lg" + (selectedLanguage == language.langCode ? ' border-indigo-300 bg-white' : ' ')} key={language.name} onClick={() => handleChange(language.langCode.toLowerCase(), language.dir)}>
                        <img src={`https://www.countryflags.io/${language.countryCode}/flat/64.png`} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default withNamespaces()(Settings);