import React from "react";
import comma from "../../assets/images/coma.png";
import user1 from "../../assets/images/user-1.png";
import user2 from "../../assets/images/user-2.png";
import user3 from "../../assets/images/user-3.png";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Review = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <>
      <section className="seo-marketers">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="seo-con">
                <p className="seo-con-1">Why Choose Us?</p>
                <p className="seo-con-2">
                  Don't just take our word for it. We are proud to share our
                  customer's actual <br /> experience of our platform and how
                  they are blown away.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="seo-slider">
                <section className="regular slider">
                  <Slider {...settings}>
                    <div>
                      <div className="slider-content">
                        <div className="slider-p">
                          <img className="comma-pic" src={comma} alt="" />
                          <p className="slider-p-1">
                            "Last Friday, with the help of SEO.ai, I wrote the
                            article. I only edited slightly what the robot wrote
                            for me (I only fact-checked - and it looks fine).
                          </p>
                          <p className="slider-p-2">
                            {" "}
                            On Sunday I found the article on page 1 of Google."
                          </p>
                        </div>
                        <p className="lise-p">
                          {" "}
                          <img className="comma-pic1" src={user1} alt="" />
                          Lise Korsedal
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="slider-content">
                        <div className="slider-p">
                          <img className="comma-pic" src={comma} alt="" />
                          <p className="slider-p-1">
                            "Last Friday, with the help of SEO.ai, I wrote the
                            article. I only edited slightly what the robot wrote
                            for me (I only fact-checked - and it looks fine).
                          </p>
                          <p className="slider-p-2">
                            {" "}
                            On Sunday I found the article on page 1 of Google."
                          </p>
                        </div>
                        <p className="lise-p">
                          {" "}
                          <img className="comma-pic1" src={user1} alt="" />
                          Lise Korsedal
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="slider-content">
                        <div className="slider-p">
                          <img className="comma-pic" src={comma} alt="" />
                          <p className="slider-p-1">
                            "Last Friday, with the help of SEO.ai, I wrote the
                            article. I only edited slightly what the robot wrote
                            for me (I only fact-checked - and it looks fine).
                          </p>
                          <p className="slider-p-2">
                            {" "}
                            On Sunday I found the article on page 1 of Google."
                          </p>
                        </div>
                        <p className="lise-p">
                          {" "}
                          <img className="comma-pic1" src={user1} alt="" />
                          Lise Korsedal
                        </p>
                      </div>
                    </div>
                    <div>
                      <div className="slider-content">
                        <div className="slider-p">
                          <img className="comma-pic" src={comma} alt="" />
                          <p className="slider-p-1">
                            "Last Friday, with the help of SEO.ai, I wrote the
                            article. I only edited slightly what the robot wrote
                            for me (I only fact-checked - and it looks fine).
                          </p>
                          <p className="slider-p-2">
                            {" "}
                            On Sunday I found the article on page 1 of Google."
                          </p>
                        </div>
                        <p className="lise-p">
                          {" "}
                          <img className="comma-pic1" src={user1} alt="" />
                          Lise Korsedal
                        </p>
                      </div>
                    </div>
                  </Slider>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
