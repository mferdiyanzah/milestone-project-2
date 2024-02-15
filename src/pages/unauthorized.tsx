import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center gap-4 flex flex-col">
      <h1 className="text-2xl font-semibold">{t("unauthorized")}</h1>
      <p>{t("unauthorizedMessage")}</p>
      <Link
        className="text-blue-500 underline hover:text-blue-400"
        to="/auth/login"
      >
        {t("login")}
      </Link>
    </div>
  );
};

export default Unauthorized;
