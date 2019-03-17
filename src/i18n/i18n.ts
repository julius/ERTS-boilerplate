import { TranslationMap, en } from "./en"
import { de } from "./de"
import { eventLanguageChange } from "../SharedData/eventLanguageChange"

/*

TRANSLATIONS

*/

const translations: { [lang: string]: TranslationMap } = {
    en: en,
    de: de,
}

export default function i18n(lang?: string): TranslationMap {
    if (typeof lang === "string") {
        return translations[lang]
    }
    return translations[getUserLanguage()]
}

/*

CHANGING THE DEFAULT LANGUAGE

*/

export function getUserLanguage(): "de" | "en" {
    if (localStorage.getItem("lang") === "de") {
        return "de"
    }
    return "en"
}

export function setUserLanguage(lang: "de" | "en"): void {
    localStorage.setItem("lang", lang)
    eventLanguageChange.trigger()
}
