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
        if(hours > 4) msg = 'preMor'
        if(hours > 6) msg = 'mor'
        if(hours > 12) msg = 'noon'
        if(hours > 17) msg = 'eve'
        if(hours > 22) msg = 'night'
        return msg;
    }
}

export default DateService;