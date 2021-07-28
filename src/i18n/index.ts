import rosetta from 'rosetta'
import dict from './dictionary'

const i18n = rosetta(dict)

const isRussian = navigator.language.toLowerCase().includes('ru')

document.documentElement.setAttribute('lang', isRussian ? 'ru' : 'en')

if(!isRussian){
    document.querySelector('title').textContent = 'Let me Google that for you'
}

i18n.locale(isRussian ? 'ru' : 'en')

export const { t, locale, set, table } = i18n
