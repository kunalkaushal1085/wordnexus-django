import React from "react";
import imgLeft from "../../assets/images/home5.png";

export const UnderstandSection = () => {
  return (
    <section className="understand">
      <div className="container">
        <div className="row al-cen">
          <div className="col-lg-6">
            <div className="understand-left">
              <img src={imgLeft} alt="" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="understand-right">
              <p className="understand-p">Legal and Contractual Information</p>
              <p className="understand-p1">
                Understanding Real Estate Contracts: An explanation of the
                various documents involved in a real estate transaction. Legal
                Considerations When Buying/Selling: Insight into the legal
                aspects of the process and tips for a smooth closing.
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
        </div>
      </div>
    </section>
  );
};
