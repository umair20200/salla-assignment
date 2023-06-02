import React, { useContext, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { URL } from "../constant";

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

      <div
        className={`w-screen h-screen absolute top-0 end-0 bottom-0 left-0 bg-gray-500/70 py-8 px-4 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden ${
          showProductModal ? "" : "hidden"
        }`}
      >
        <div className="w-full sm:w-[50%] max-w-[700px] h-auto p-4 bg-white rounded-lg shadow-xl">
          {/* <!-- modal header --> */}
          <div className="flex items-center justify-between mb-8 gap-4">
            <div className="flex-1">
              <h2 className="text-lg">{productName}</h2>
              <span className="text-xs text-gray-500"> {description} </span>
            </div>
            <button
              onClick={() => {
                setshowProductModal(false);
              }}
              type="button"
              className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1"
            >
              <i className="sicon-cancel"></i>
            </button>
          </div>
          <div className="flex flex-col w-full">
            <article className="text-sm text-darker-300 leading-[1.8] mb-4">
              <img
                src={productImage}
                className="mb-4 aspect-4/3 object-cover rounded-lg"
                alt="product img"
              />
              <p>
                لكن يجب أن أشرح لك كيف ولدت كل هذه الفكرة الخاطئة المتمثلة في
                إدانة السرور ومدح الألم ، وسأقدم لك وصفًا كاملاً للنظام ، وأشرح
                التعاليم الفعلية للمستكشف العظيم للحقيقة ، الباني البارع.
                السعادة البشرية. لا أحد يرفض أو يكره أو يتجنب المتعة نفسها ،
                لأنها متعة ، ولكن لأن أولئك الذين لا يعرفون كيفية السعي وراء
                المتعة يواجهون عواقب مؤلمة للغاية. ولا يوجد أيضًا أي شخص يحب أو
                يسعى أو يرغب في الحصول على الألم من نفسه ، لأنه ألم ، ولكن في
                بعض الأحيان تحدث ظروف يمكن أن يجلب له فيها الكدح والألم بعض
                المتعة الكبيرة. لنأخذ مثالا تافها ، أي منا يقوم بتمارين بدنية
                شاقة ، إلا للحصول على بعض المزايا منها؟ ولكن من له الحق في أن
                يخطئ في رجل يختار أن يستمتع بسرور ليس له عواقب مزعجة ، أو من
                يتجنب الألم الذي لا ينتج عنه متعة؟ من ناحية أخرى ، فإننا نشجب
                بسخط صالح ونكره الرجال الذين خدعهم سحر اللذة اللحظية وإحباطهم ،
                وأعمتهم الرغبة ، لدرجة أنهم لا يستطيعون التنبؤ بالألم والمتاعب
                التي لا بد أن تنجم عن ذلك ؛ واللوم المتساوي يقع على أولئك الذين
                يفشلون في أداء واجبهم بسبب ضعف الإرادة ، وهو نفس القول من خلال
                الانكماش من الكد والألم. هذه الحالات بسيطة للغاية وسهلة التمييز.
                في ساعة مجانية ، عندما تكون قدرتنا على الاختيار غير مقيدة وعندما
                لا شيء يمنعنا من القيام بما نفضله ، يجب الترحيب بكل متعة وتجنب
                كل ألم. ولكن في ظروف معينة وبسبب ادعاءات الواجب أو التزامات
                العمل ، سيحدث في كثير من الأحيان أنه يجب نبذ الملذات وقبول
                الإزعاج. لذلك يتمسك الرجل الحكيم دائمًا في هذه الأمور بمبدأ
                الاختيار هذا: فهو يرفض الملذات لتأمين ملذات أعظم أخرى ، وإلا
                فإنه يتحمل الآلام لتجنب الآلام السيئة
              </p>
            </article>
            <div className="flex items-center justify-center gap-4">
              <div className="flex shrink-0 items-center justify-center p-2 border border-1 border-gray-200 rounded-lg">
                <button className="shrink-0 px-2 text-md text-gray-500">
                  +
                </button>
                <input
                  type="number"
                  value="1"
                  className="w-[50px] flex-1 text-center appearance-none"
                />
                <button className="shrink-0 px-2 text-md text-gray-500">
                  -
                </button>
              </div>
              <button
                onClick={addToCartHandler}
                type="button"
                className="w-full h-[42px] bg-primary text-secondary flex-1 p-2 text-md rounded-md"
              >
                إضافة للسلة
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
