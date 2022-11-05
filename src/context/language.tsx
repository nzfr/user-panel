import React, { createContext, ReactNode, useReducer } from "react";
import persian from "../i18n/per.json";
import eng from "../i18n/eng.json";

enum LangActionType {
  SET_LANGUAGE = "SET_LANGUAGE",
}

type LangState = {
  language: string;
};

type LangStateProps = {
  children: ReactNode;
};

type SetLanguageAction = {
  type: typeof LangActionType.SET_LANGUAGE;
  payload: string;
};

type ContextProps = {
  state: LangState;
  dispatch: {
    setLanguage: (lang: string) => void;
    translate: (key: string) => string;
  };
};

const langReducer = (
  state: LangState,
  action: SetLanguageAction
): LangState => {
  switch (action.type) {
    case LangActionType.SET_LANGUAGE:
      return { language: action.payload };
    default:
      return state;
  }
};

const localStorageLang =
  typeof window === "undefined" ? "per" : localStorage.getItem("language");
const initialState = {
  language: localStorageLang ?? "per",
};

export const LangContext = createContext({} as ContextProps);

const LangState = ({ children }: LangStateProps) => {
  const [state, dispatch] = useReducer(langReducer, initialState);
  const setLanguage = (lang: string) => {
    localStorage.setItem("language", lang);
    dispatch({
      type: LangActionType.SET_LANGUAGE,
      payload: lang,
    });
    if (document) document.dir = lang === "per" ? "rtl" : "ltr";
  };

  const translate = (key: string) => {
    const { language } = state;
    let langData: { [key: string]: string } = {};

    if (language === "per") {
      langData = persian;
    } else {
      langData = eng;
    }
    return langData[key];
  };

  return (
    <LangContext.Provider
      value={{ state, dispatch: { setLanguage, translate } }}
    >
      {children}
    </LangContext.Provider>
  );
};

export default LangState;
