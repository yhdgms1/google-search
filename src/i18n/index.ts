import rosetta from "rosetta";
import dict from "./dictionary";

const i18n = rosetta(dict);

const isRussian = navigator.language.toLowerCase().includes("ru");

if (!isRussian) {
  document.title = "Let me Google that for you";
  document.documentElement.setAttribute("lang", "en");
}

const { t, locale } = i18n;

locale(isRussian ? "ru" : "en");

export { t, locale };
