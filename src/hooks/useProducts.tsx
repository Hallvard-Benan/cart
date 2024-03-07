type Product = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
};
export default function useProducts() {
  const products: Product[] = [
    {
      id: 0,
      title: "Milk",
      price: 19.99,
      discountedPrice: 19.99,
    },
    {
      id: 1,
      title: "Bread",
      price: 12.99,
      discountedPrice: 12.99,
    },
    {
      id: 2,
      title: "Cheese",
      price: 25.99,
      discountedPrice: 25.99,
    },
    {
      id: 3,
      title: "Chicken",
      price: 95.99,
      discountedPrice: 95.99,
    },
  ];
  return products;
}
