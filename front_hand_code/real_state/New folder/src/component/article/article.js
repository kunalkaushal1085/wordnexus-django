import React from "react";
import re from "../../assets/images/home2.png";
import mask1 from "../../assets/images/mask-1.png";
import mask2 from "../../assets/images/mask-2.png";
import mask3 from "../../assets/images/mask-3.png";
import mask4 from "../../assets/images/mask-4.png";
import mask5 from "../../assets/images/mask-5.png";

export const Article = () => {
  return (
    <>
      <section className="Articly">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="Articly-content">
                <p className="Articly-p">Our Services </p>
              </div>
            </div>
          </div>
          <div className="row al-cen">
            <div className="col-lg-7">
              <div className="Articly-left">
                <img className="img-das-1" src={re} alt="" />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="Articly-right">
                <ul className="Articly-ul">
                  <li>
                    <div className="media-Articly">
                      <div className="Articly-img-div">
                        <img className="mask-1-img" src={mask1} alt="" />
                      </div>
                      <div className="Articly-img-div-1">
                        <p className="Articly-p2">Buying a Home</p>
                        <p className="Articly-p3">
                          Our team is committed to finding you a place that
                          feels like home. We'll guide you through the entire
                          process, from the initial search to handing over the
                          keys.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="media-Articly">
                      <div className="Articly-img-div">
                        <img className="mask-1-img" src={mask2} alt="" />
                      </div>
                      <div className="Articly-img-div-1">
                        <p className="Articly-p2">Selling a Home</p>
                        <p className="Articly-p3">
                          Let us help you showcase your property in its best
                          light. Our marketing strategies are designed to
                          attract qualified buyers and get you the best return
                          on your investment.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="media-Articly">
                      <div className="Articly-img-div">
                        <img className="mask-1-img" src={mask3} alt="" />
                      </div>
                      <div className="Articly-img-div-1">
                        <p className="Articly-p2">Investment Properties</p>
                        <p className="Articly-p3">
                          Looking to grow your real estate portfolio? We have a
                          keen eye for investment opportunities and can help you
                          make informed decisions that align with your financial
                          goals.
                        </p>
                      </div>
                    </div>
                  </li>
                  {/* <li>
                    <div className="media-Articly">
                      <div className="Articly-img-div">
                        <img className="mask-1-img" src={mask4} alt="" />
                      </div>
                      <div className="Articly-img-div-1">
                        <p className="Articly-p2">
                          Optimize For Readability &amp; SEO
                        </p>
                        <p className="Articly-p3">
                          Let us optimize the article for best readibility &amp;
                          SEO with cover image, meta tags &amp; alt tags.
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="media-Articly">
                      <div className="Articly-img-div">
                        <img className="mask-1-img" src={mask5} alt="" />
                      </div>
                      <div className="Articly-img-div-1">
                        <p className="Articly-p2">Submit to Google</p>
                        <p className="Articly-p3">
                          Let's submit to Google for Indexing with help of
                          Google APIs. So, they can rank us fast.
                        </p>
                      </div>
                    </div>
                  </li> */}
                </ul>
                <ul className="Articly-ul-1">
                  <li>
                    <button className="Articly-bt BT">
                      Automate Your Blog
                    </button>
                  </li>
                  <li>
                    <button className="Articly-bt BT">
                      Create a Demo Article
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
