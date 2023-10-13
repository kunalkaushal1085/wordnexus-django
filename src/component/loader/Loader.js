import React from "react";
import { ColorRing } from "react-loader-spinner";

const Loader = ({ responseData }) => {
  console.log("responseData,", responseData.status);
  return (
    <div className="loding-out">
      <div className="loding-in">
        <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperclassName="blocks-wrapper"
          colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
        />
        <p className="text-white text-md">
          {responseData && responseData?.status}
        </p>
      </div>
    </div>
  );
};

export default Loader;
