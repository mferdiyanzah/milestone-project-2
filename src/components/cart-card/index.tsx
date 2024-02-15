import { Col, Divider, Row } from "antd";
import { useTranslation } from "react-i18next";
import { RandomAvatar } from "react-random-avatars";
import { CartCardProps } from "./cart-card.interface";
import { formattedPrice } from "../../utils/currency";

const CartCard = ({ product, onRemove }: CartCardProps) => {
  const { t } = useTranslation();

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
          <p className="m-0">{formattedPrice(product.price)}</p>
        </Row>
      </Col>
      <Col
        xs={{ flex: "100%" }}
        lg={{ flex: "10%" }}
        className="flex justify-end"
      >
        <button className="text-red-500" onClick={onRemove}>
          {t("delete")}
        </button>
      </Col>
      <Divider />
    </Row>
  );
};

export default CartCard;
