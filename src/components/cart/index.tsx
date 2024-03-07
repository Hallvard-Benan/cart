import { useContext } from "react";
import { CartContext } from "../../context/cartContext";

export default function Cart() {
  const context = useContext(CartContext);

  if (!context) throw new Error("context missing from cart component");

  const { state, dispatch } = context;

  return (
    <div
      className={`bg-gray-500 fixed top-0 right-0 opacity-0 transition-all duration-500 translate-x-full p-8 ${
        state.isVisible && "opacity-100 translate-x-1"
      }`}
    >
      <div className="flex justify-end">
        <button
          onClick={() => dispatch({ type: "toggleVisible" })}
          className="text-3xl"
        >
          x
        </button>
      </div>
      <ul className={`flex  flex-col gap-4 w-72  `}>
        {state.cart.map((item) => (
          <li
            key={item.id}
            className="border-2 p-2 flex gap-6 items-center justify-center"
          >
            <div>{item.quantity}</div>
            <div>
              <h2>{item.title}</h2>
              <p>{item.discountedPrice}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="border-2"
                onClick={() => dispatch({ type: "addProduct", payload: item })}
              >
                +
              </button>
              <button
                onClick={() => dispatch({ type: "decrease", payload: item })}
              >
                -
              </button>
            </div>
            <button onClick={() => dispatch({ type: "remove", payload: item })}>
              X
            </button>
          </li>
        ))}
      </ul>
      total:
      {state.total.toFixed(2)}$
      <button
        className="border-2 border-red-600 p-2 rounded-md"
        onClick={() => dispatch({ type: "clearCart" })}
      >
        Clear cart
      </button>
    </div>
  );
}
