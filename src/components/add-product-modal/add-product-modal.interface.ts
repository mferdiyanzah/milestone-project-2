export interface AddProductModalProps {
  visible: boolean;
  addNewProduct: (product: IProductForm) => void;
  onCancel: () => void;
}

export interface IProductForm {
  name: string;
  quantity: number;
}
