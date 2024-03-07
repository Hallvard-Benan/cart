import { useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { FaCartShopping } from "react-icons/fa6";

export default function Navbar() {
  const context = useContext(CartContext);
  if (!context) throw new Error("context missing from navbar");

  const { state, dispatch } = context;
  const amount = state.cart.reduce(
    (acc, item) => (acc = acc + item.quantity),
    0
  );

  return (
    <div className="p-4 text-xl flex justify-end">
      <button
        onClick={() => dispatch({ type: "toggleVisible" })}
        className="flex"
      >
        <FaCartShopping
          size={48}
          className={` ${amount > 0 ? "text-blue-800" : "text-gray-600"}`}
        />
        <p
          className={`h-[48px] w-[48px]  ${
            amount > 0
              ? "text-blue-800 border-2 border-blue-800"
              : "text-gray-600"
          } text-white p-2 rounded-full flex justify-center items-center`}
        >
          {amount}
        </p>
      </button>
    </div>
  );
}
