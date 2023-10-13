import React from "react";
import imageRight from "../../assets/images/home3.png";

export const Results = () => {
  return (
    <section className="resultes">
      <div className="container">
        <div className="row cen-align-result">
          <div className="col-lg-7">
            <div className="resultes-left">
              <p className="resultes-p">What results you can expect</p>
              <p className="resultes-p-1">
                Transportation and Accessibility,Schools and Education,Notable
                Attractions.
              </p>
              <ul>
                <li>
                  <button className="resultes-bt BT">Automate Your Blog</button>
                </li>
                <li>
                  <button className="resultes-bt BT">
                    Create a Demo Article
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="resultes-right">
              <img src={imageRight} className="image-right" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
