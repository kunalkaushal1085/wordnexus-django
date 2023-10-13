import React, { useState } from "react";
import das from "../../assets/images/home.png";
import { UploadModal } from "../modal/modal";

export const Banner = () => {
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <UploadModal isOpen={showModal} onClose={closeModal} />
      <section className="automate">
        <div className="container">
          <div className="row center-custom">
            <div className="col-lg-6">
              <div className="automate-left">
                <p className="Writer-1">Welcome to [Your Real Estate Agency]</p>
                <p className="Writer-2">Discover Your Perfect Home</p>
                <p className="Writer-3">
                  Explore a diverse range of properties in the most sought-after
                  neighborhoods. Whether you're searching for a cozy starter
                  home or an elegant estate, we have the keys to your ideal
                  property..
                </p>
                <p className="Writer-4">Start your 7-day free trial today</p>
                <ul className="writer-ul">
                  <li>
                    {/* <button className="Automate-1 BT" onClick={openModal}>
                      {" "}
                      Upload Your Image{" "}
                    </button> */}
                    <ul className="writer-ul">
                      <li>
                        <button className="Automate BT">
                          Automate Your Blog
                        </button>
                      </li>
                      <li>
                        <button className="Automate-1 BT">
                          Create a Demo Article
                        </button>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="automate-right">
                <img src={das} className="das-img" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
