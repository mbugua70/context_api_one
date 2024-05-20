import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import { CartContextProvider } from "./context_shop/shop_cart_context.jsx";

function App() {
  return (
    <>
      {/* the value that is passed as the prop below is only used by the component that is trying to access and that component was not wrapped by the Provider */}
      <CartContextProvider>
        <Header
        // cart={shoppingCart}
        // onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        />
        <Shop>
          {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </Shop>
      </CartContextProvider>
    </>
  );
}

export default App;
