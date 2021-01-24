let translations = {
    'assignment': {
        'HE': 'מטלה',
        'FR': 'mission',
        'AR': 'مهمة',
        'EN': 'Assignment'
    },
    'You are not authorized to access this assignment.': {
        'HE': 'נראה שאין לכם גישה למטלה זאת.',
        'FR': 'Vous n\'êtes pas autorisé à accéder à cette mission.',
        'AR': 'أنت غير مصرح لك للوصول إلى هذا الواجب.',
        'EN': 'You are not authorized to access this assignment.'
    }
};
const TranslationService = {
    language: 'HE',
    get: function (word) { return translations[word][this.language] },
}

export default TranslationService;