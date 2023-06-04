import React from "react";
import { useState } from "react";
export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const [passwordError, SetPasswordError] = useState(null);
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isPassword(password) {
    return password.length;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    SetPasswordError(null)
    setError(null)
 
    if (isValidEmail(email) && isPassword(pass)) {
      props.handleSubmit();
    } else {
       
      if (!isValidEmail(email)) {
        setError("Email is invalid");
      }
      if (!isPassword(pass)) {
        SetPasswordError("Password Required");
      }
    }
  };

  return (
    <div
      className={`w-screen h-screen absolute top-0 end-0 bottom-0 left-0 bg-gray-500/70 p-4 py-8 px-4 z-50 flex items-start justify-center overflow-y-auto overflow-x-hidden ${
        props.showLoginModal ? "" : "hidden"
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
            onClick={() => {
              props.setShowLoginModal(false);
            }}
            type="button"
            className="w-[28px] h-[28px] shrink-0 flex items-center justify-center text-xs border border-red-500 text-red-500 rounded-full p-1"
          >
            <i className="sicon-cancel"></i>
          </button>
        </div>
        <div className="flex flex-col w-full">
          <form
            method="post"
            onSubmit={(e) => {
            
              handleSubmit(e);
            }}
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
              {error && <h2 style={{ color: "red" }}>{error}</h2>}
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
               {passwordError && <h2 style={{ color: "red" }}>{passwordError}</h2>}
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
  );
};
