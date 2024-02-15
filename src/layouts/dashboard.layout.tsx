import { Flex, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import LanguageSwitcher from "../components/language-switcher";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const DashboardLayout = () => {
  const { t } = useTranslation();
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/unauthorized");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Layout className="h-screen">
      <Layout.Header className="bg-white shadow-md flex items-center justify-between pl-4">
        <h1 className="font-bold text-4xl text-blue-900">SINAU</h1>
        <Flex justify="center" align="center" gap="2em">
          <LanguageSwitcher isAbsolute={false} />
          <button
            className="hover:text-gray-500 py-2 px-4 rounded"
            onClick={onLogout}
            tabIndex={0}
          >
            {t("logout")}
          </button>
        </Flex>
      </Layout.Header>
      <Layout.Content className="p-4 flex justify-center">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};

export default DashboardLayout;
