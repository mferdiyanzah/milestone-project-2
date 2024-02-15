import { Form, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ILoginForm } from "./login-form.interface";

const LoginForm = () => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [form] = Form.useForm<ILoginForm>();
  const formValues = Form.useWatch([], form);
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsLoginBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsLoginBtnDisabled(true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const onLogin = () => {
    const values = form.getFieldsValue();
    if (login(values)) {
      messageApi.success(t("loginSuccess"));
      navigate("/");
      return;
    }
    messageApi.error(t("loginError"));
  };

  return (
    <Form
      className="w-full"
      layout="vertical"
      form={form}
      autoComplete="off"
      size="large"
    >
      <Form.Item
        label={t("username")}
        name="username"
        rules={[
          {
            required: true,
            message: t("usernameRequired"),
          },
        ]}
      >
        <Input placeholder={t("usernamePlaceholder")} />
      </Form.Item>
      <Form.Item
        label={t("password")}
        name="password"
        rules={[{ required: true, message: t("passwordRequired") }]}
      >
        <Input.Password placeholder={t("passwordPlaceholder")} />
      </Form.Item>
      <Row justify="space-between" align="middle">
        <button
          className={`px-8 py-2 text-white rounded-md text-base ${
            isLoginBtnDisabled
              ? "cursor-not-allowed bg-gray-200"
              : "bg-blue-900"
          }`}
          disabled={isLoginBtnDisabled}
          onClick={onLogin}
        >
          {t("login")}
        </button>

        <p>
          {t("noAccount")}{" "}
          <Link to="/auth/register" className="text-blue-900 underline">
            {t("register")}
          </Link>
        </p>
      </Row>

      {contextHolder}
    </Form>
  );
};

export default LoginForm;
