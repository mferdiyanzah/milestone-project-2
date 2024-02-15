import { Col, Row, Spin, Steps } from "antd";
import { createContext, useState, useMemo, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { IRegisterForm } from "./register.interface.ts";
import { Link } from "react-router-dom";

const PersonalInformation = lazy(
  () => import("../../components/personal-information/index.tsx")
);

const AddressInformation = lazy(
  () => import("../../components/address-information/index.tsx")
);

const AccountInformation = lazy(
  () => import("../../components/account-information/index.tsx")
);

export const RegistrationFormContext = createContext({
  formData: {} as IRegisterForm | undefined,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setFormData: (_: IRegisterForm) => {},
  onNext: () => {},
  onPrev: () => {},
});

const Register = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<IRegisterForm>();
  const [currentStep, setCurrentStep] = useState(0);

  const contextValue = useMemo(
    () => ({
      formData,
      setFormData,
      onNext: () => setCurrentStep((prevStep) => prevStep + 1),
      onPrev: () => setCurrentStep((prevStep) => prevStep - 1),
    }),
    [formData, setFormData]
  );

  const steps = [
    t("personalInformation"),
    t("addressInformation"),
    t("accountInformation"),
  ];

  const items = steps.map((item, idx) => ({
    key: idx,
    title: item,
  }));

  return (
    <Row className="lg:h-[60vh] h-screen">
      <Col
        sm={{ flex: "100%" }}
        xl={{ flex: "40%" }}
        className="pr-4 w-full lg:border-r border-gray-400 grid grid-rows-2"
      >
        <div className="flex lg:justify-center justify-start flex-col">
          <h1 className=" text-7xl font-bold m-0 text-blue-900">SINAU</h1>
          <h3 className="mb-4 text-xl">{t("register")}</h3>
          <p className="text-sm">{t("registerDesc")}</p>
        </div>

        <Steps direction="vertical" current={currentStep} items={items} />
      </Col>
      <Col
        xl={{ flex: "60%" }}
        sm={{ flex: "100%" }}
        className="w-full lg:pl-10 flex flex-col lg:justify-center lg:items-center"
      >
        <RegistrationFormContext.Provider value={contextValue}>
          <Suspense fallback={<Spin />}>
            {currentStep === 0 ? <PersonalInformation /> : null}

            {currentStep === 1 ? <AddressInformation /> : null}

            {currentStep === 2 ? <AccountInformation /> : null}
          </Suspense>
        </RegistrationFormContext.Provider>

        <p>
          {t("haveAccount")}{" "}
          <Link to="/auth/login" className="text-blue-900 underline">
            {t("login")}
          </Link>
        </p>
      </Col>
    </Row>
  );
};

export default Register;
