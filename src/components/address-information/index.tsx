/* eslint-disable */
import { Form, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import useFormContext from "../../pages/register/register.context";
import { dummyStateCityZip } from "./address-information.dummy";
import {
  IAddressInformationForm,
  ICityData,
} from "./address-information.interface";
import { useTranslation } from "react-i18next";
import { capitalize } from "../../utils/capitalize";

const AddressInformation = () => {
  const { t } = useTranslation();
  const { formData, setFormData, onNext, onPrev } = useFormContext();
  const [form] = Form.useForm<IAddressInformationForm>();
  const formValues = Form.useWatch([], form);
  const [selectedState, setSelectedState] = useState("");
  const [cityOptions, setCityOptions] = useState<ICityData[]>();
  const [zipOptions, setZipOptions] = useState<string[]>();
  const [isNextBtnDisabled, setIsNextBtnDisabled] = useState(true);

  useEffect(() => {
    const isFormDataExist =
      formData?.address !== undefined ||
      formData?.city !== undefined ||
      formData?.state !== undefined ||
      formData?.zip !== undefined;
    if (!formData || !isFormDataExist) return;

    const existState = formData.state ?? "";
    const stateIdx = dummyStateCityZip.findIndex(
      (item) => item.name === existState
    );
    setSelectedState(existState);

    const savedCityOptions =
      (dummyStateCityZip[stateIdx]?.cities as ICityData[]) || [];
    const cityIdx = savedCityOptions.findIndex(
      (item) => item.name === formData.state
    );
    setCityOptions(savedCityOptions);

    const savedZipOptions =
      dummyStateCityZip[cityIdx]?.cities[stateIdx]?.zip || undefined;
    setZipOptions(savedZipOptions);

    const initValues = {
      address: formData.address,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
    };
    form.setFieldsValue(initValues);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then((currentValues) => {
        setIsNextBtnDisabled(!Object.values(currentValues).length);
      })
      .catch(() => {
        setIsNextBtnDisabled(true);
      });
  }, [formValues]);

  const handleFormValuesChange = (
    changedValues: any,
    value: IAddressInformationForm
  ) => {
    const formFieldName = Object.keys(changedValues)[0];
    if (formFieldName === "state") {
      if (value.city || value.zip) {
        form.setFieldsValue({ city: undefined, zip: undefined });
      }
      setSelectedState(changedValues.state);
      const stateIdx = dummyStateCityZip.findIndex(
        (item) => item.name === capitalize(changedValues.state)
      );
      const cityOptions = dummyStateCityZip[stateIdx].cities;
      setCityOptions(cityOptions);
    }

    if (formFieldName === "city") {
      if (value.zip) {
        form.setFieldsValue({ zip: undefined });
      }

      const stateIdx = dummyStateCityZip.findIndex(
        (item) => item.name === capitalize(value.state)
      );
      const cityIdx = dummyStateCityZip[stateIdx]?.cities.findIndex(
        (item) => item.name === capitalize(value.city)
      );
      const zipOptions = dummyStateCityZip[stateIdx]?.cities[cityIdx]?.zip;

      setZipOptions(zipOptions);
    }

    setFormData({ ...formData, ...value });
  };

  const onClickNext = () => {
    const values = form.getFieldsValue();
    setFormData({ ...formData, ...values });
    onNext();
  };

  const stateOptions = dummyStateCityZip.map((item) => ({
    label: item.name,
    value: item.name.toLowerCase(),
  }));

  return (
    <Form
      layout="vertical"
      form={form}
      className="w-full"
      size="large"
      autoCorrect="off"
      autoComplete="off"
      onValuesChange={handleFormValuesChange}
    >
      <Form.Item
        label={t("address")}
        name="address"
        rules={[{ required: true, message: t("addressRequired") }]}
      >
        <Input.TextArea
          placeholder={t("addressPlaceholder")}
          maxLength={100}
          rows={4}
          showCount
        />
      </Form.Item>

      <Form.Item
        label={t("state")}
        name="state"
        rules={[{ required: true, message: t("stateRequired") }]}
      >
        <Select
          showSearch
          placeholder={t("statePlaceholder")}
          options={stateOptions}
        />
      </Form.Item>

      <Form.Item label={t("city")} name="city" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder={t("statePlaceholder")}
          options={cityOptions?.map((item) => ({
            label: item.name,
            value: item.name.toLowerCase(),
          }))}
          disabled={!selectedState}
        />
      </Form.Item>

      <Form.Item label={t("zipCode")} name="zip" rules={[{ required: true }]}>
        <Select
          showSearch
          placeholder={t("zipCodePlaceholder")}
          options={zipOptions?.map((item, idx) => ({
            label: item,
            value: idx,
          }))}
          disabled={cityOptions === undefined || zipOptions === undefined}
        />
      </Form.Item>

      <Row justify="space-between">
        <button
          className="px-8 py-2 text-white rounded-md text-base bg-blue-900"
          onClick={onPrev}
        >
          {t("prevButton")}
        </button>
        <button
          className={`px-8 py-2 text-white rounded-md text-basem ${
            isNextBtnDisabled ? "cursor-not-allowed bg-gray-200" : "bg-blue-900"
          }`}
          onClick={onClickNext}
          disabled={isNextBtnDisabled}
        >
          {t("nextButton")}
        </button>
      </Row>
    </Form>
  );
};

export default AddressInformation;
