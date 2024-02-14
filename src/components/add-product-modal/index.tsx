import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  AddProductModalProps,
  IProductForm,
} from "./add-product-modal.interface";

const AddProductModal = ({
  visible,
  addNewProduct,
  onCancel,
}: AddProductModalProps) => {
  const { t } = useTranslation();
  const [form] = Form.useForm<IProductForm>();
  const formValues = Form.useWatch([], form);
  const [isFinishBtnDisabled, setIsFinishBtnDisabled] = useState(true);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsFinishBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsFinishBtnDisabled(true);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formValues]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    addNewProduct(values);
    onClose();
  };

  const onClose = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={<h2 className="font-bold text-2xl">{t("addNewProduct")}</h2>}
      open={visible}
      footer={null}
      onCancel={onClose}
      centered
      zIndex={1000}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        size="large"
        onFinish={onFinish}
      >
        <Form.Item
          label={t("productName")}
          name="name"
          rules={[
            {
              required: true,
              message: t("productNameRequired"),
            },
          ]}
        >
          <Input placeholder={t("productNamePlaceholder")} />
        </Form.Item>
        <Form.Item
          label={t("quantity")}
          name="quantity"
          rules={[
            {
              required: true,
              message: t("quantityRequired"),
            },
            {
              pattern: /^\d*$/,
              message: t("quantityType"),
            },
          ]}
        >
          <Input type="number" placeholder={t("quantityPlaceholder")} />
        </Form.Item>
        <button
          className={`px-8 py-2 w-full text-white rounded-md text-basem ${
            isFinishBtnDisabled
              ? "cursor-not-allowed bg-gray-200"
              : "bg-blue-900"
          }`}
          type="submit"
        >
          {t("addProduct")}
        </button>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
