import React from "react";
import { changeLanguage } from "../Api/apiCall";
import { withTranslation } from "react-i18next";

const LanguageSelector = (props) => {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="container">
      <img
        onClick={() => onChangeLanguage("tr")}
        src="https://www.countryflags.io/TR/flat/24.png"
        alt="Tuskish Flag"
        style={{ cursor: "pointer" }}
      />
      <img
        onClick={onChangeLanguage.bind(this, "en")}
        src="https://www.countryflags.io/US/flat/24.png"
        alt="Usa Flag"
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};
export default withTranslation()(LanguageSelector);
