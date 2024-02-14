export interface CartCardProps {
  name: string;
  price: number;
  quantity: number;
  onRemove: () => void;
}
