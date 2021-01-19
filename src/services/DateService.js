const DateService = {
    toMonth: (UTCmonth) => {
        return {
            '0': 'ינואר',
            '1': 'פברואר',
            '2': 'מרץ',
            '3': 'אפריל',
            '4': 'מאי',
            '5': 'יוני',
            '6': 'יולי',
            '7': 'אוגוסט',
            '8': 'ספטמבר',
            '9': 'אוקטובר',
            '10': 'נובמבר',
            '11': 'דצמבר',

        }[UTCmonth];
    },
    getGreeting: (hours) => {
        let msg;
        if(hours > 4) msg = 'בוקר מוקדם שמח'
        if(hours > 6) msg = 'בוקר טוב'
        if(hours > 12) msg = 'צהריים טובים'
        if(hours > 17) msg = 'ערב טוב'
        if(hours > 22) msg = 'לילה טוב'
        return msg;
    }
}

export default DateService;