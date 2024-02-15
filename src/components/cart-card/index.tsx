import { Col, Divider, Row } from "antd";
import { useTranslation } from "react-i18next";
import { RandomAvatar } from "react-random-avatars";
import { CartCardProps } from "./cart-card.interface";

const CartCard = ({ product, onRemove }: CartCardProps) => {
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
        lg={{ flex: "70%" }}
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
      <Col
        xs={{ flex: "100%" }}
        lg={{ flex: "10%" }}
        className="flex justify-end"
      >
        <button className="text-red-500" onClick={onRemove}>
          Delete
        </button>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartCard;
