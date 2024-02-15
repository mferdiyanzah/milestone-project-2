import { Form, Input, Modal, Row } from "antd";
import { hashSync } from "bcryptjs";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useFormContext from "../../pages/register/register.context";
import { IRegisterForm } from "../../pages/register/register.interface";

const AccountInformation = () => {
  const { t } = useTranslation();
  const { formData, setFormData, onPrev } = useFormContext();
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const [isBtnDisabled, setIsBtnDisabled] = useState(true);
  const { register } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const isFormDataExist =
      formData?.username !== undefined || formData?.password !== undefined;
    if (!formData || !isFormDataExist) return;

    const initValues = {
      username: formData.username,
      password: formData.password,
      confirmPassword: "",
    };
    form.setFieldsValue(initValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsBtnDisabled(true);
      });

    const values = form.getFieldsValue();

    setFormData({
      ...formData,
      ...values,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const passwordConfig = {
    rules: [
      {
        required: true,
        message: t("passwordRequired"),
      },
      {
        min: 8,
        message: t("passwordMinLength"),
      },
      {
        pattern: /^(?=.*[!@#$%^&*])/,
        message: t("passwordMinSpecialChar"),
      },
      {
        pattern: /^(?=.*[0-9])/,
        message: t("passwordMinNumber"),
      },
      {
        pattern: /^(?=.*[A-Z])/,
        message: t("passwordMinUpperCase"),
      },
      {
        pattern: /^(?=.*[a-z])/,
        message: t("passwordMinLowerCase"),
      },
    ],
  };

  const onClickFinish = async () => {
    const values = form.getFieldsValue();
    setFormData({ ...formData, ...values });

    const hashedPassword = hashSync(values.password, 10);

    const registerPayload: IRegisterForm = {
      ...values,
      password: hashedPassword,
      confirmPassword: undefined,
    };

    const registerData = JSON.stringify(registerPayload);

    register(JSON.parse(registerData));
    Modal.info({
      title: t("successTitle"),
      content: `${t("successRegister")} ${values.username}!`,
      centered: true,
      onOk: () => {
        navigate("/auth/login");
      },
    });
  };

  return (
    <Form
      layout="vertical"
      className="w-full"
      autoComplete="off"
      size="large"
      form={form}
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
        required
        {...passwordConfig}
      >
        <Input.Password placeholder={t("passwordPlaceholder")} />
      </Form.Item>

      <Form.Item
        label={t("confirmPassword")}
        name="confirmPassword"
        required
        rules={[
          {
            required: true,
            message: t("confirmPasswordRequired"),
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error(t("confirmPasswordNotMatch")));
            },
          }),
        ]}
      >
        <Input.Password placeholder={t("confirmPasswordPlaceholder")} />
      </Form.Item>

      <Row justify="space-between">
        <button
          className="px-8 py-2 text-white rounded-md text-base bg-blue-900"
          onClick={onPrev}
        >
          {t("prevButton")}
        </button>

        <button
          className={`px-8 py-2 text-white rounded-md text-base ${
            isBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickFinish}
          disabled={isBtnDisabled}
        >
          {t("finishButton")}
        </button>
      </Row>
    </Form>
  );
};

export default AccountInformation;
