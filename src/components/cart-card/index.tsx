import { Col, Divider, Row } from "antd";
import { useTranslation } from "react-i18next";
import { IProduct } from "../../pages/cart/cart.interface";
import { RandomAvatar } from "react-random-avatars";

const CartCard = ({ product }: { product: IProduct }) => {
  const { t } = useTranslation();

  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(product.price);

  return (
    <Row className="pb-2 w-full">
      <Col xs={{ flex: "100%" }} lg={{ flex: "20%" }}>
        <RandomAvatar name={product.name} size={150} />
      </Col>
      <Col
        xs={{ flex: "100%" }}
        lg={{ flex: "80%" }}
        className="flex justify-between flex-col font-semibold"
      >
        <h3 className="m-0 text-xl">{product.name}</h3>
        <Row justify="space-between" align="middle" className="text-base">
          <p className="m-0">
            {t("quantity")}: {product.quantity}
          </p>
          <p className="m-0">{formattedPrice}</p>
        </Row>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartCard;
