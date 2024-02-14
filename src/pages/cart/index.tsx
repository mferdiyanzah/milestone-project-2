import { Col, Divider, Flex, Row, Space } from "antd";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AddProductModal from "../../components/add-product-modal";
import CartCard from "../../components/cart-card";
import useAuth from "../../hooks/useAuth";
import { IProduct } from "./cart.interface";
import { IProductForm } from "../../components/add-product-modal/add-product-modal.interface";

const Cart = () => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isAddProductModalVisible, setIsAddProductModalVisible] =
    useState(false);
  const [productList, setProductList] = useState<IProduct[]>([]);

  const totalPrice = useMemo(() => {
    const currentPrice = productList.reduce(
      (acc, product) => acc + product.price,
      0
    );
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(currentPrice);
  }, [productList]);

  if (!currentUser) navigate("/auth/register");

  const handleAddProduct = (product: IProductForm) => {
    const productData: IProduct = {
      ...product,
      id: productList.length + 1,
      price: Math.floor(Math.random() * 100000),
    };

    setProductList([...productList, productData]);
  };

  return (
    <Space direction="vertical" size="large" className="mx-0 w-4/6">
      <Row justify="space-between" align="middle">
        <h1 className="text-3xl m-0 font-bold">{t("cart")}</h1>
        <button
          className="bg-blue-900 text-white p-2 rounded hover:bg-blue-800"
          onClick={() => setIsAddProductModalVisible(true)}
        >
          {t("addNewProduct")}
        </button>
      </Row>
      <Divider className="m-0" />
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <Flex vertical gap="1em" wrap="wrap">
            {productList.length === 0 ? (
              <h2 className="text-2xl">{t("emptyCart")}</h2>
            ) : (
              productList.map((product) => (
                <CartCard key={product.id} product={product} />
              ))
            )}
          </Flex>
        </Col>
        <Col span={6} className="font-semibold">
          <h2 className="text-xl">{t("summary")}</h2>
          <Divider />
          <Row justify="space-between">
            <p>{t("totalItems")}</p>
            <p>{productList.length}</p>
          </Row>
          <Row justify="space-between">
            <p>{t("totalPrice")}</p>
            <p>{totalPrice}</p>
          </Row>
          <button className="w-full bg-blue-900 mt-4 hover:bg-blue-800 text-white p-2 rounded">
            Checkout
          </button>
        </Col>
      </Row>

      <AddProductModal
        visible={isAddProductModalVisible}
        onCancel={() => setIsAddProductModalVisible(false)}
        addNewProduct={handleAddProduct}
      />
    </Space>
  );
};

export default Cart;