import React from "react";

export const GrowthPage = () => {
  return (
    <section className="Growth">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="Growth-content">
              <p className="Growth-p">
                Market Insights: [Your City/Region] Real Estate Trends
              </p>
              <p className="Growth-p1">
                Stay Informed, Make Informed Decisions!
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4">
            <div className="Growth-common BT">
              <p className="Growth-p2">Current Trends</p>
              <p className="Growth-p3">
                Days on Market: On average, homes in [City/Region] are spending
                [Number] days on the market. This is a [Increase/Decrease] from
                [Previous Year].
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="Growth-common BT">
              <p className="Growth-p2">Developments</p>
              <p className="Growth-p3">
                Discuss any significant real estate developments or projects in
                the pipeline for your city or region. This could include new
                residential communities, commercial spaces, or infrastructure
                projects.
              </p>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="Growth-common BT">
              <p className="Growth-p2">Expert Analysis</p>
              <p className="Growth-p3">
                Offer insights from your team members or guest experts about the
                current market conditions and predictions for the future. Share
                valuable tips for buyers and sellers in light of these trends.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="Growth-button">
              <ul>
                <li>
                  <button className="groth-bt BT">Automate Your Blog</button>
                </li>
                <li>
                  <button className="groth-bt BT">Create a Demo Article</button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
