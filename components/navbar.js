import React, { useState, useContext } from "react";
import { ShopContext } from "../context/shop-context";
import { useEffect } from "react";
import {URL} from "../constant"

export const Navbar = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(ShopContext);
  const [email, setEmail] = useState("");
  const [isLogged, SetisLogged] = useState(false);
  useEffect(async () => {
    SetisLogged(localStorage.getItem("isLogged"));
    getCartItems();
  }, []);

  const getCartItems = async () => {
    fetch(URL.cartProductUrl, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        addToCart(data.response);
      });
  };
  const deleteCartItem = async (id) => {
    removeFromCart(id);
    fetch(`${URL.cartProductUrl}/${id}`, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    })
     
  };

  const [pass, setPass] = useState("");

  const [showCartItem, setShowCartItem] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("isLogged", true);
    SetisLogged(true);
    closeloginPopup();
  };
  const openLoginPopup = () => {
    if (!isLogged) {
      setShowLoginModal(true);
    }
  };
  const closeloginPopup = () => {
    setShowLoginModal(false);
  };

  const showCart = () => {
    if (!isLogged) {
      openLoginPopup();
      return;
    }
    setShowCartItem(!showCartItem);
  };

  return (
    <>
      <header className="w-full">
        <div className="container">
          <div className="md:py-6 py-4">
            <div className="flex justify-between flex-col sm:flex-row gap-4 items-center">
              {/* <!-- store logo & title --> */}
              <div className="flex flex-col sm:flex-row items-center gap-4 relative">
                <a
                  href="#"
                  className="block w-[80px] h-[80px] bg-gray-50 p-2 rounded-full border-4 border-secondary-50"
                >
                  <img
                    src="https://cdn.salla.network/images/logo/logo-square.png"
                    alt="Logo"
                  />
                </a>
                <div className="flex flex-col">
                  <h1 className="text-xl">متجر التجربة الجميلة</h1>
                  <small className="text-gray-400">
                    متجرك لكل تجاربك وأفكارك الجميلة
                  </small>
                </div>
              </div>
              {/* <!-- cart and user --> */}
              <div className="flex items-center gap-4">
                <button
                  onClick={openLoginPopup}
                  type="button"
                  className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary"
                >
                  <i className="sicon-user"></i>
                </button>
                <div className="relative">
                  <button
                    onClick={showCart}
                    type="button"
                    className="w-[40px] h-[40px] rounded-full text-center flex items-center justify-center bg-secondary-50 text-primary"
                  >
                    <i className="sicon-shopping-bag"></i>
                  </button>
                  {/* <!-- user cart --> */}
                  <div
                    className={`w-[200px] p-4 bg-white rounded-lg shadow-xl absolute z-30 top-[50px] end-[-70px] sm:end-0 ${
                      showCartItem ? "" : "hidden"
                    }`}
                  >
                    <ul>
                      {/* <!-- product-entry--mini --> */}

                      {cartItems.map((item) => (
                        <li className="pb-4 mb-4" key={item.id}>
                          <div className="flex items-center justify-between gap-3">
                            <a
                              href="#"
                              className="flex items-start justify-center gap-2 flex-1"
                            >
                              <img
                                className="rounded-md w-[35px] object-cover shrink-0 overflow-hidden"
                                src={item.productImage}
                                alt="Product Thumb"
                              />
                              <div className="flex flex-col">
                                <h4 className="text-xs mb-1">
                                  {item.productName}
                                </h4>
                                <span className="text-xs text-gray-500">
                                  {item.Saleprice}
                                </span>
                              </div>
                            </a>
                            <button
                              onClick={() => {
                                deleteCartItem(item.id)
                               
                              }}
                              type="button"
                              className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1"
                            >
                              <i className="sicon-trash"></i>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* <!--login modal--> */}
      <div
        className={`w-screen h-screen absolute top-0 end-0 bottom-0 left-0 bg-gray-500/70 p-4 py-8 px-4 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden ${
          showLoginModal ? "" : "hidden"
        }`}
      >
        <div className="w-full sm:w-[50%] max-w-[400px] h-auto p-4 bg-white rounded-lg shadow-xl">
          {/* <!-- modal header --> */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div className="flex-1">
              <h2 className="text-lg">تسجيل الدخول</h2>
              <span className="text-xs text-gray-500">
                قم بتسجيل الدخول لمتابعة التسوق
              </span>
            </div>
            <button
              onClick={closeloginPopup}
              type="button"
              className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1"
            >
              <i className="sicon-cancel"></i>
            </button>
          </div>
          <div className="flex flex-col w-full">
            <form
              method="post"
              onSubmit={handleSubmit}
              className="flex flex-col"
            >
              <div className="mb-4">
                <label className="block mb-2 text-md">اسم المستخدم</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  name="username"
                  id="username"
                  className="w-full p-2 bg-white appearance-none rounded-md border text-md"
                  placeholder="اسم المستخدم.."
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2 text-md">كلمة المرور</label>
                <input
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="w-full p-2 bg-white appearance-none rounded-md border text-md"
                  placeholder="كلمة المرور.."
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-secondary flex-1 p-2 text-md rounded-md"
                >
                  دخول
                </button>
                <button
                  type="button"
                  className="w-fit text-primary underline p-2 text-md rounded-md"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
