import { Space } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const MainDashboard = () => {
  const { t } = useTranslation();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) navigate("/auth/register");

  const onClickLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Space direction="vertical" size="large" className="w-full">
      <div>
        <h3 className="mb-4 text-2xl font-semibold">{t("greetingMessage")}</h3>
        <p className="text-lg">
          {t("helloMessage")} {currentUser?.fullName}!
        </p>
        <button
          onClick={onClickLogout}
          className="px-5 py-2 mt-8 text-white rounded-md text-sm bg-blue-900"
        >
          {t("logout")}
        </button>
      </div>
    </Space>
  );
};

export default MainDashboard;
