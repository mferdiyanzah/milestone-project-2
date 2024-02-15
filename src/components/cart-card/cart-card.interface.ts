import { IProduct } from "../../pages/cart/cart.interface";

export interface CartCardProps {
  product: IProduct;
  onRemove: () => void;
}
