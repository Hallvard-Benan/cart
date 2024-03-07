import "./App.css";
import Products from "./components/products";
import { CartContextProvider } from "./context/cartContext";
import Cart from "./components/cart";
import Navbar from "./components/nav";
function App() {
  return (
    <CartContextProvider>
      <>
        <Navbar></Navbar>
        <Products></Products>
        <Cart></Cart>
      </>
    </CartContextProvider>
  );
}

export default App;
