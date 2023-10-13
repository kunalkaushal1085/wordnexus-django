import React, { useState } from "react";
import { BASE_URL, setToken, setUserId } from "../../common/common";
import axios from "axios";
import logo from "../../assets/images/vecteezy_realestate-logo-design-icon-template_12650609.jpg";

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/auth/authslice";

export const UploadModal = ({ isOpen, onClose, children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [response, setResponse] = useState("");
  const [responseData, setResponseData] = useState("");
  const [changeForm, setChangeForm] = useState(false);

  const [userLoginDetails, setLoginUserDetail] = useState({
    username: "",
    password: "",
  });

  const onChangeHandlerr = (e) => {
    const { name, value } = e.target;
    setLoginUserDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const userLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${BASE_URL}/customer-login`,
        userLoginDetails
      );
      if (!(res?.status === 200 || res?.status === 201)) {
        return res.data.message;
      } else {
        console.log(res, "response?.data");

        if (res?.data?.status === 200) {
          setToken(res?.data?.token);
          setUserId(res?.data?.user_id);
          handleClose();
          setUserDetail("");
          toast.success(res?.data?.message);
          return res.data.response;
        } else {
          toast.error(res?.data?.message);
        }
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Please login with correct username password");
      const message =
        (error.res && error.res.data && error.res.data.message) ||
        error.message ||
        error.toString();
      return message;
    }
  };

  //   register

  const [userDetails, setUserDetail] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserDetail((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const userRegisterHandler = (e) => {
    e.preventDefault();
    if (
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.first_name ||
      !userDetails.last_name ||
      !userDetails.username
    ) {
      toast.warning("All fields are required.");
    } else {
      dispatch(registerUser({ userDetails, navigate }));
      setUserDetail("");
    }
  };

  if (!isOpen) return null;

  const modalClass = isOpen ? "modal open" : "modal";

  const handleClose = () => {
    setResponse();
    setResponseData();
    onClose();
  };

  return (
    <>
      <div className={modalClass}>
        {children}
        <div className="sm:max-w-lg w-full p-10 bg-white rounded-xl z-10 mx-auto mb-2 mt-3">
          <div className="flex justify-items-end	">
            <button
              type="button"
              className="text-gray-400 bg-transparent text-right hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="defaultModal"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {!changeForm ? (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/">
                  <img
                    className="mx-auto h-20 w-auto"
                    src={logo}
                    alt="Your Company"
                  />
                </Link>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form
                  className="space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={userLogin}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={userLoginDetails?.username}
                        onChange={onChangeHandlerr}
                        autoComplete="username"
                        required
                        className="block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      {/* <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot password?
                        </a>
                      </div> */}
                    </div>
                    <div className="mt-2 ">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        value={userLoginDetails?.password}
                        onChange={onChangeHandlerr}
                        autoComplete="current-password"
                        required
                        className=" block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  You don't have an account?{" "}
                  <p
                    onClick={() => setChangeForm(!changeForm)}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Register
                  </p>
                </p>
              </div>
            </div>
          ) : (
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <Link to="/">
                  <img
                    className="mx-auto h-20 w-auto"
                    src={logo}
                    alt="Your Company"
                  />
                </Link>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className=" ml mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={userRegisterHandler}>
                  <div className="flex gap-5">
                    <div>
                      <label
                        htmlFor="first_name"
                        className="block text-left text-sm font-medium leading-6 text-gray-900"
                      >
                        First Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="first_name"
                          name="first_name"
                          type="text"
                          value={userDetails?.first_name}
                          onChange={onChangeHandler}
                          autoComplete="first_name"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="last_name"
                        className="block text-left text-sm font-medium leading-6 text-gray-900"
                      >
                        Last Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="last_name"
                          name="last_name"
                          type="text"
                          value={userDetails?.last_name}
                          onChange={onChangeHandler}
                          autoComplete="last_name"
                          required
                          className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      User Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        value={userDetails?.username}
                        onChange={onChangeHandler}
                        autoComplete="first_name"
                        required
                        className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-left text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={userDetails?.email}
                        onChange={onChangeHandler}
                        autoComplete="email"
                        required
                        className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                      {/* <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div> */}
                    </div>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        value={userDetails?.password}
                        onChange={onChangeHandler}
                        required
                        className=" pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign Up
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  You have an account?{" "}
                  <p
                    onClick={() => setChangeForm(!changeForm)}
                    className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                  >
                    Login
                  </p>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
