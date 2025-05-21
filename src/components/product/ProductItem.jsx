import { PropTypes } from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { commonCardStyles } from "../../styles/card";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../../redux/slices/wishlistSlice";

const ProductCardWrapper = styled(Link)`
  ${commonCardStyles}
  @media(max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-img {
    height: 393px;
    position: relative;

    @media (max-width: ${breakpoints.sm}) {
      height: 320px;
    }
  }

  .product-wishlist-icon {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 100%;

    &:hover {
      background-color: ${defaultTheme.color_yellow};
      color: ${defaultTheme.color_white};
    }
  }
`;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToWishlist = (e) => {
    e.preventDefault(); // prevent navigation to /product/details

    dispatch(
      addToWishlist({
        id: product.id,
        name: product.title,
        price: product.price,
        color: product.colors?.[0] || "", // or pass full color array if needed
        quantity: 1,
        imgSource: product.imgSource,
      })
    );

    navigate("/wishlist");
  };

  return (
    <ProductCardWrapper key={product.id} to="/product/details">
      <div className="product-img">
        <img className="object-fit-cover" src={product.imgSource} />
        <button
          type="button"
          className="product-wishlist-icon flex items-center justify-center bg-white"
          onClick={handleAddToWishlist}
        >
          <i className="bi bi-heart"></i>
        </button>
      </div>
      <div className="product-info">
        <p className="font-bold">{product.title}</p>
        <div className="flex items-center justify-between text-sm font-medium">
          <span className="text-gray">{product.brand}</span>
          <span className="text-outerspace font-bold">${product.price}</span>
        </div>
      </div>
    </ProductCardWrapper>
  );
};

export default ProductItem;

ProductItem.propTypes = {
  product: PropTypes.object,
};
