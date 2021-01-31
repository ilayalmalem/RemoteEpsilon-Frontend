let translations = {
    'assignment': {
        'HE': 'מטלה',
        'FR': 'mission',
        'AR': 'مهمة',
        'EN': 'Assignment'
    },
    'assignments': {
        'HE': 'מטלות',
        'FR': 'mission',
        'AR': 'مهمة',
        'EN': 'Assignments'
    },
    'You are not authorized to access this assignment.': {
        'HE': 'נראה שאין לכם גישה למטלה זאת.',
        'FR': 'Vous n\'êtes pas autorisé à accéder à cette mission.',
        'AR': 'أنت غير مصرح لك للوصول إلى هذا الواجب.',
        'EN': 'You are not authorized to access this assignment.'
    },
    'you have': {
        'HE': 'יש לך',
        'EN': 'You have'
    }
};
const TranslationService = {
    language: 'HE',
    get: function (word) { return translations[word][this.language] },
}

export default TranslationService;