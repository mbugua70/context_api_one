import { useContext } from "react";
import { CartContext } from "../context_shop/shop_cart_context";

export default function Cart() {
  // item value from the context
  const { items, updateToCartItem } = useContext(CartContext);

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => updateToCartItem(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateToCartItem(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}

// the  use of consumer for accessing the context value

// export default function Cart({ onUpdateItemQuantity }) {
//   return (
//     <CartContext.Consumer>
//       {(crtItems) => {
//         const totalPrice = crtItems.items.reduce(
//           (acc, item) => acc + item.price * item.quantity,
//           0
//         );
//         const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;
//         return (
//           <div id="cart">
//             {crtItems.items.length === 0 && <p>No items in cart!</p>}
//             {crtItems.items.length > 0 && (
//               <ul id="cart-items">
//                 {crtItems.items.map((item) => {
//                   const formattedPrice = `$${item.price.toFixed(2)}`;

//                   return (
//                     <li key={item.id}>
//                       <div>
//                         <span>{item.name}</span>
//                         <span> ({formattedPrice})</span>
//                       </div>
//                       <div className="cart-item-actions">
//                         <button
//                           onClick={() => onUpdateItemQuantity(item.id, -1)}
//                         >
//                           -
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button
//                           onClick={() => onUpdateItemQuantity(item.id, 1)}
//                         >
//                           +
//                         </button>
//                       </div>
//                     </li>
//                   );
//                 })}
//               </ul>
//             )}
//             <p id="cart-total-price">
//               Cart Total: <strong>{formattedTotalPrice}</strong>
//             </p>
//           </div>
//         );
//       }}
//     </CartContext.Consumer>
//   );
// }
