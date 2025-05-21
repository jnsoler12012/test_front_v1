import styled from "styled-components";
import CartItem from "./CartItem";
import { breakpoints } from "../../styles/themes/default";

// Redux imports
import { useSelector, useDispatch } from "react-redux";
import { updateQuantity, removeItem } from "../../redux/slices/cartSlice"; // Adjust path

const ScrollbarXWrapper = styled.div`
  overflow-x: scroll;
  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: grey;
  }
`;

const CartTableWrapper = styled.table`
  border-collapse: collapse;
  min-width: 680px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  thead {
    th {
      height: 48px;
      padding-left: 16px;
      padding-right: 16px;
      letter-spacing: 0.03em;

      @media (max-width: ${breakpoints.lg}) {
        padding: 16px 12px;
      }

      @media (max-width: ${breakpoints.xs}) {
        padding: 10px;
      }
    }
  }

  tbody {
    td {
      padding: 24px 16px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);

      @media (max-width: ${breakpoints.lg}) {
        padding: 16px 12px;
      }

      @media (max-width: ${breakpoints.xs}) {
        padding: 10px 6px;
      }
    }
  }
`;

const CartTable = () => {
  const dispatch = useDispatch();

  // Read cartItems from Redux store
  const cartItems = useSelector((state) => state.cart.items);

  console.log(cartItems);
  

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // optional: no zero or negative qty
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const CART_TABLE_HEADS = [
    "Product details",
    "Price",
    "Quantity",
    "Shipping",
    "Subtotal",
    "Action",
  ];

  return (
    <ScrollbarXWrapper>
      <CartTableWrapper className="w-full">
        <thead>
          <tr className="text-start">
            {CART_TABLE_HEADS?.map((column, index) => (
              <th
                key={index}
                className={`bg-outerspace text-white font-semibold capitalize text-base ${
                  index === CART_TABLE_HEADS.length - 1 ? " text-center" : ""
                }`}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.length > 0 ? (
            cartItems.map((cartItem) => (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: "20px" }}>
                Your cart is empty.
              </td>
            </tr>
          )}
        </tbody>
      </CartTableWrapper>
    </ScrollbarXWrapper>
  );
};

export default CartTable;
