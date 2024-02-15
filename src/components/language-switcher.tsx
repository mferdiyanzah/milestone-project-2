import { Switch } from "antd";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = ({ isAbsolute = true }: { isAbsolute?: boolean }) => {
  const { i18n } = useTranslation();

  return (
    <Switch
      checkedChildren="ID"
      unCheckedChildren="EN"
      onChange={(checked) => {
        i18n.changeLanguage(checked ? "id" : "en");
      }}
      className={`${
        isAbsolute && "absolute top-4 right-4"
      } bg-blue-500 hover:bg-blue-600`}
    />
  );
};

export default LanguageSwitcher;
