import React from "react";
import footer from "../../assets/images/logo-footer.png";

export const Footer = () => {
  return (
    <>
      <section className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="all-footer-ui">
                <div className="footer-div-1 wd-1">
                  <h5>Pages</h5>
                  <ul className="footer-ul">
                    <li>
                      <a href="javascript:void(0)">Home</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">About</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Pricing</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Career</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Blog</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Contact</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-div-1 wd-2">
                  <h5>Links</h5>
                  <ul className="footer-ul">
                    <li>
                      <a href="javascript:void(0)">Get a FREE demo</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Features</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Sign in</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Get started</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">AI Content Detector</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-div-1 wd-3">
                  <h5>Use cases</h5>
                  <ul className="footer-ul">
                    <li>
                      <a href="javascript:void(0)">AI writing</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">SEO automation</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Content Marketing AI</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">AI in SEO</a>
                    </li>
                  </ul>
                </div>
                <div className="footer-div-1 wd-4">
                  <h5>Subscribe to our newsletter</h5>
                  <p className="Stayup">
                    Stay up to date on the latest trends in AI writing and SEO
                    as well as tips and tricks on how to improve your automated
                    writing and SEO skills.
                  </p>
                  <ul className="ul-foorer-1">
                    <li>
                      <input
                        className="input-footer"
                        type="text"
                        placeholder="Enter Your email"
                      />
                    </li>
                    <li>
                      <button className="Subseribe-footer BT">Subseribe</button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="copy-right">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="copy-left ">
                <h3 style={{ text: "#fff" }}>AI_Caption_Tool</h3>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="copy-right-content">
                <p>Copyright © AI_Caption_Tool | 2023</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
