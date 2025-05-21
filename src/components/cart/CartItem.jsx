import styled from "styled-components";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const CartTableRowWrapper = styled.tr`
  .cart-tbl {
    &-prod {
      grid-template-columns: 80px auto;
      column-gap: 12px;

      @media (max-width: ${breakpoints.xl}) {
        grid-template-columns: 60px auto;
      }
    }

    &-qty {
      .qty-inc-btn,
      .qty-dec-btn {
        width: 24px;
        height: 24px;
        border: 1px solid ${defaultTheme.color_platinum};
        border-radius: 2px;

        &:hover {
          border-color: ${defaultTheme.color_sea_green};
          background-color: ${defaultTheme.color_sea_green};
          color: ${defaultTheme.color_white};
          cursor: pointer;
        }
      }

      .qty-value {
        width: 40px;
        height: 24px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-medium: 500;
        color: ${defaultTheme.color_outerspace};
      }
    }
  }

  .cart-prod-info {
    p {
      margin-right: 8px;
      span {
        margin-right: 4px;
      }
    }
  }

  .cart-prod-img {
    width: 80px;
    height: 80px;
    overflow: hidden;
    border-radius: 8px;

    @media (max-width: ${breakpoints.xl}) {
      width: 60px;
      height: 60px;
    }
  }
`;

const CartItem = ({ cartItem, onQuantityChange, onRemove }) => {
  const { id, quantity, price, imgSource, title, color, size, shipping } =
    cartItem;

  const handleDec = () => {
    if (quantity > 1) {
      onQuantityChange(id, quantity - 1);
    }
  };

  const handleInc = () => {
    onQuantityChange(id, quantity + 1);
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onRemove(id);
  };

  return (
    <CartTableRowWrapper key={id}>
      <td>
        <div className="cart-tbl-prod grid">
          <div className="cart-prod-img">
            <img src={imgSource} className="object-fit-cover" alt="" />
          </div>
          <div className="cart-prod-info">
            <h4 className="text-base">{title}</h4>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Color: </span> {color}
            </p>
            <p className="text-sm text-gray inline-flex">
              <span className="font-semibold">Size:</span> {size}
            </p>
          </div>
        </div>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">${price}</span>
      </td>
      <td>
        <div className="cart-tbl-qty flex items-center">
          <button className="qty-dec-btn" onClick={handleDec}>
            <i className="bi bi-dash-lg"></i>
          </button>
          <span className="qty-value inline-flex items-center justify-center font-medium text-outerspace">
            {quantity}
          </span>
          <button className="qty-inc-btn" onClick={handleInc}>
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </td>
      <td>
        <span className="cart-tbl-shipping uppercase text-silver font-bold">
          {shipping === 0 ? "Free" : shipping}
        </span>
      </td>
      <td>
        <span className="text-lg font-bold text-outerspace">
          ${(price * quantity).toFixed(2)}
        </span>
      </td>
      <td>
        <div className="cart-tbl-actions flex justify-center">
          <Link
            to="/"
            className="tbl-del-action text-red"
            onClick={handleRemove}
          >
            <i className="bi bi-trash3"></i>
          </Link>
        </div>
      </td>
    </CartTableRowWrapper>
  );
};

export default CartItem;

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
