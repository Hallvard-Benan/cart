import { createContext, useReducer, ReactNode } from "react";

type Product = {
  id: number;
  title: string;
  price: number;
  discountedPrice: number;
};

type Props = {
  children: ReactNode;
};

type CartItem = Product & { quantity: number };

type Action =
  | {
      type: "addProduct" | "remove" | "decrease";
      payload: Product;
    }
  | { type: "clearCart" | "toggleVisible" };

type State = {
  cart: CartItem[];
  total: number;
  isVisible: boolean;
};

const initialState = { cart: [], total: 0, isVisible: false };
function reducer(state: State, action: Action) {
  let productIndex;
  let cart;
  let newTotal;
  switch (action.type) {
    case "addProduct":
      cart = [...state.cart];
      productIndex = cart.findIndex((item) => item.id === action.payload.id);
      if (productIndex === -1) {
        cart.push({ ...action.payload, quantity: 1 });
      } else {
        cart = [
          ...cart.slice(0, productIndex),
          { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 },
          ...cart.slice(productIndex + 1),
        ];
      }
      newTotal = cart.reduce(
        (tot, acc) => (tot += acc.discountedPrice * acc.quantity),
        0
      );
      return { ...state, cart: cart, total: newTotal };

    case "remove":
      cart = [...state.cart];
      productIndex = cart.findIndex((item) => item.id === action.payload.id);
      if (productIndex !== -1) {
        cart = cart.slice(0, productIndex).concat(cart.slice(productIndex + 1));
      }
      newTotal = cart.reduce(
        (tot, acc) => (tot = tot + acc.discountedPrice * acc.quantity),
        0
      );
      return { ...state, cart: cart, total: newTotal };

    case "decrease":
      cart = [...state.cart];
      productIndex = cart.findIndex((item) => item.id === action.payload.id);
      if (productIndex !== -1) {
        if (cart[productIndex].quantity === 1) {
          cart = cart
            .slice(0, productIndex)
            .concat(cart.slice(productIndex + 1));
        } else {
          cart = [
            ...cart.slice(0, productIndex),
            { ...action.payload, quantity: cart[productIndex].quantity - 1 },
            ...cart.slice(productIndex + 1),
          ];
        }
      }
      newTotal = cart.reduce(
        (tot, acc) => (tot = tot + acc.discountedPrice * acc.quantity),
        0
      );
      return { ...state, cart: cart, total: newTotal };

    case "clearCart":
      return { ...state, cart: [], total: 0 };

    case "toggleVisible":
      return { ...state, isVisible: !state.isVisible };
    default:
      throw new Error();
  }
}
interface CartContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}
export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
