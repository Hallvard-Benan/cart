import { useContext } from "react";
import useProducts from "../../hooks/useProducts";
import { CartContext } from "../../context/cartContext";

export default function Products() {
  const products = useProducts();
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("cartcontext is missing");
  }

  const { dispatch, state } = context;

  return (
    <div className="grid gap-2 ">
      {products.map((product) => (
        <div key={product.id} className="border-2 p-4 w-60 mx-auto">
          {product.discountedPrice}${" "}
          <button
            className="border-2 border-blue-600 p-2 rounded-md"
            onClick={() => dispatch({ type: "addProduct", payload: product })}
          >
            Add {product.title}
          </button>
        </div>
      ))}
    </div>
  );
}
