import styled from "styled-components";
import { currencyFormat } from "../../utils/helper";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useSelector } from "react-redux";

const CheckoutSummaryWrapper = styled.div`
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.05),
    -2px -2px 4px 0px rgba(0, 0, 0, 0.05);
  padding: 40px;

  @media (max-width: ${breakpoints.xl}) {
    padding: 24px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding: 16px;
  }

  @media (max-width: ${breakpoints.xs}) {
    background-color: transparent;
    padding: 0;
    box-shadow: none;
  }

  .order-list {
    row-gap: 24px;
    margin-top: 20px;

    @media (max-width: ${breakpoints.sm}) {
      row-gap: 16px;
    }
  }

  .order-item {
    grid-template-columns: 60px auto;
    gap: 16px;

    @media (max-width: ${breakpoints.xs}) {
      align-items: center;
    }

    &-img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 4px;
    }

    &-info {
      gap: 16px;

      @media (max-width: ${breakpoints.xs}) {
        flex-direction: column;
        gap: 6px;
      }
    }
  }

  .order-info {
    margin-top: 30px;
    @media (max-width: ${breakpoints.sm}) {
      margin-top: 20px;
    }

    li {
      margin: 6px 0;
    }

    .list-separator {
      height: 1px;
      background-color: ${defaultTheme.color_anti_flash_white};
      margin: 12px 0;
    }
  }
`;
const CheckoutSummary = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const summaryItems = cartItems?.length ? cartItems : [];

  // ✅ Calculate totals
  const totalQuantity = summaryItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const subtotal = summaryItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  // ✅ Fixed values (can also be calculated)
  const savings = 30;
  const shipping = 5;
  const total = subtotal - savings + shipping;

  return (
    <CheckoutSummaryWrapper>
      <h4 className="text-xxl font-bold text-outersapce">
        Checkout Order Summary
      </h4>
      <div className="order-list grid">
        {summaryItems?.map((order) => {
          return (
            <div className="order-item grid" key={order.id}>
              <div className="order-item-img">
                <img
                  src={order.imgSource}
                  className="object-fit-cover"
                  alt=""
                />
              </div>
              <div className="order-item-info flex justify-between">
                <div className="order-item-info-l">
                  <p className="text-base font-bold text-outerspace">
                    {order.name}&nbsp;
                    <span className="text-gray">x{order.quantity}</span>
                  </p>
                  <p className="text-base font-bold text-outerspaace">
                    Color: &nbsp;
                    <span className="text-gray font-normal">{order.color}</span>
                  </p>
                </div>
                <div className="order-item-info-r text-gray font-bold text-base">
                  {currencyFormat(order.price)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Original order summary (unchanged) */}
      <ul className="order-info">
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">
            Subtotal{" "}
            <span className="text-gray font-semibold">
              ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})
            </span>
          </span>
          <span className="text-outerspace font-bold text-lg">
            {currencyFormat(subtotal)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">Savings</span>
          <span className="text-outerspace font-bold text-lg">
            -{currencyFormat(savings)}
          </span>
        </li>
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">Shipping</span>
          <span className="text-outerspace font-bold text-lg">
            {currencyFormat(shipping)}
          </span>
        </li>
        <li className="list-separator"></li>
        <li className="flex items-center justify-between">
          <span className="text-outerspace font-bold text-lg">Total</span>
          <span className="text-outerspace font-bold text-lg">
            {currencyFormat(total)}
          </span>
        </li>
      </ul>
    </CheckoutSummaryWrapper>
  );
};

export default CheckoutSummary;
