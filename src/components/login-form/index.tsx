import { Form, Input } from "antd";
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  return (
    <Form
      className="w-full"
      layout="vertical"
      form={form}
      autoComplete="off"
      size="large"
    >
      <Form.Item label={t("email")} name="email" rules={[{ required: true }]}>
        <Input type="email" />
      </Form.Item>
      <Form.Item
        label={t("password")}
        name="password"
        rules={[{ required: true }]}
      >
        <Input type="password" />
      </Form.Item>
      <Form.Item>
        <button
          className={"px-8 py-2 text-white rounded-md text-base bg-blue-900"}
        >
          {t("login")}
        </button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
