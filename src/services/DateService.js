const DateService = {
    toMonth: (UTCmonth) => {
        return {
            '0': 'ינואר',
            '1': 'פברואר',
        }[UTCmonth];
    }

}

export default DateService;