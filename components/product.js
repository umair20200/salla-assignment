import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { URL } from "../constant";
import { ProductDetail } from "../modals/product-detail";
export const Product = (props) => {
  const {
    id,
    productName,
    orignalPrice,
    Saleprice,
    description,
    productImage,
  } = props.data;
  const [showProductModal, setshowProductModal] = useState(false);

  const { addToCart, cartItems } = useContext(ShopContext);

  const cartItemCount = cartItems[id];
  const addToCartHandler = async () => {
    var product = cartItems.find((item) => item.id === props.data.id);
    if (!product) {
      addToCart(props.data);
      const response = await fetch(URL.cartProductUrl, {
        method: "POST",
        body: JSON.stringify(props.data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.msg === "Product Inserted") {
        addToCart(props.data);
      }
    }
  };

  return (
    <>
      <div className="rounded-lg border-2 border-gray-50 flex flex-col items-start justify-start md:p-3 p-2 relative">
        <a
          onClick={() => {
            setshowProductModal(true);
          }}
          className="block w-full relative mb-4"
        >
          <img
            src={productImage}
            className="w-full aspect-4/3 object-cover rounded-lg"
            alt="product"
          />
        </a>
        <div className="w-full flex flex-col flex-1 items-start justify-start">
          <a href="#" className="block w-full text-primary text-center">
            <h2 className="text-sm">{productName}</h2>
            <small className="text-xs text-gray-500">{description}</small>
          </a>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center w-full my-4 gap-0 sm:gap-2">
          <span className="font-medium text-md">{orignalPrice} SAR</span>
          <span className="font-medium text-sm line-through text-gray-300">
            {Saleprice} SAR
          </span>
        </div>
        <button
          onClick={addToCartHandler}
          type="button"
          className="w-full bg-primary text-secondary p-2 text-md rounded-md"
        >
          إضافة للسلة
        </button>
      </div>

      <ProductDetail item={props.data} showProductModal={showProductModal} setshowProductModal={setshowProductModal} addToCartHandler={addToCartHandler}></ProductDetail> 
    </>
  );
};
