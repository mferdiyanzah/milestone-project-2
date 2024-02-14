import { Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import LoginForm from "../../components/login-form";

const Login = () => {
  const { t } = useTranslation();

  return (
    <Row className="lg:h-[30vh] lg:gap-0 gap-10 lg:w-4/5" justify="center">
      <Col
        sm={{ flex: "100%" }}
        xl={{ flex: "40%" }}
        className="pr-4 w-full lg:border-r border-gray-400 flex lg:justify-center flex-col"
      >
        <div>
          <h1 className=" text-7xl font-bold m-0 text-blue-900">SINAU</h1>
          <h3 className="mb-4 text-xl">{t("login")}</h3>
          <p className="text-sm">{t("register_desc")}</p>
        </div>
      </Col>
      <Col
        xl={{ flex: "60%" }}
        sm={{ flex: "100%" }}
        className="w-full lg:pl-10 flex lg:items-center"
      >
        <LoginForm />
      </Col>
    </Row>
  );
};

export default Login;
