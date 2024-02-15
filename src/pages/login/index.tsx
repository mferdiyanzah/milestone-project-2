import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import LoginForm from "../../components/login-form";

const Login = () => {
  const { t } = useTranslation();

  return (
    <Row className="xl:h-[30vh] xl:gap-0 gap-10 xl:w-4/5" justify="center">
      <Col
        sm={{ flex: "100%" }}
        xl={{ flex: "40%" }}
        className="pr-4 w-full xl:border-r border-gray-400 flex xl:items-center flex-col"
      >
        <h1 className=" text-7xl font-bold m-0 text-blue-900">SINAU</h1>
        <h3 className="mb-4 text-xl">{t("login")}</h3>
        <p className="text-sm">{t("registerDesc")}</p>
      </Col>
      <Col
        xl={{ flex: "60%" }}
        sm={{ flex: "100%" }}
        className="w-full xl:pl-10 flex xl:items-center"
      >
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Login;
