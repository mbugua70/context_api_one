import { useContext } from "react";
import { CartContext } from "../context_shop/shop_cart_context";

export default function Product({
  id,
  image,
  title,
  price,
  description,
  // onAddToCart,
}) {
  const { addToCartItem } = useContext(CartContext);
  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">${price}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          <button onClick={() => addToCartItem(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  );
}
