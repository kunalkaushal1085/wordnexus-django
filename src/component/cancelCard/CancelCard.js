import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCancelApi } from "../../redux/auth/authslice";
import { Footer } from "../footer/footer";
import { Header } from "../header/header";

export const CancelCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [isSuccess, setisSuccess] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const bak = searchParams.get("bak");
  const encodedString = bak;
  const decodedString = atob(encodedString);
  const data = decodedString;

  const successRef = useRef(null);
  successRef.current = isSuccess;

  useEffect(() => {
    if (!successRef.current) {
      setTimeout(() => {
        dispatch(getCancelApi({ data, navigate }));
      }, 3000);
      setisSuccess(true);
    }
  }, []);

  return (
    <>
      <Header />
      <div className="container mx-auto mt-5 mb-5">
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <div className="bg-white shadow-md rounded-lg p-4">
              <div className="rounded-full h-32 w-32 bg-gray-200 flex items-center justify-center mx-auto">
                <i className="text-6xl text-red-500">✘</i>
              </div>
              <h1 className="mt-4 text-2xl text-red-500 text-center">
                Cancelled
              </h1>
              <p className="text-gray-500 text-center">
                Your payment has been cancelled.
                <br />
                If you have any questions, please contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
