import React, { useState } from "react";
import "./pricing.css";
import { UploadModal } from "../modal/modal";
import { useDispatch } from "react-redux";
import { postPaymentApi } from "../../redux/auth/authslice";

export const Pricing = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const tokenn = localStorage.getItem("token");

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handlePaymet = () => {
    dispatch(postPaymentApi());
  };

  return (
    <section className="price-work">
      <div className="container">
        <UploadModal isOpen={showModal} onClose={closeModal} />
        <div className="row">
          <div className="col-lg-12">
            <div className="price-content">
              <h1 className="text-accent">Pricing</h1>
              <p className="fs-500">plans that work for everyone</p>

              <div className="plans">
                <div className="plan plan--light">
                  <h2 className="plan-title">basic</h2>

                  <p className="plan-price">
                    $4.99<span>/month</span>
                  </p>

                  <p className="plan-description">
                    Eleifend cursus volutpat risus convallis nam sed quam
                    sollicitudin eget leo at erat cursus justo
                  </p>

                  {tokenn ? (
                    <button className="groth-bt BT" onClick={handlePaymet}>
                      {console.log(tokenn)}
                      Join Now
                    </button>
                  ) : (
                    <button className="groth-bt BT" onClick={openModal}>
                      Join Now
                    </button>
                  )}
                </div>

                <div className="plan plan--accent">
                  <h2 className="plan-title">super</h2>

                  <p className="plan-price">
                    $19.99<span>/month</span>
                  </p>

                  <p className="plan-description">
                    Eleifend cursus volutpat risus convallis nam sed quam
                    sollicitudin eget leo at erat cursus justo
                  </p>

                  {tokenn ? (
                    <button className="groth-bt BT" onClick={handlePaymet}>
                      Join Now
                    </button>
                  ) : (
                    <button className="groth-bt BT" onClick={openModal}>
                      Join Now
                    </button>
                  )}
                </div>

                <div className="plan plan--light">
                  <h2 className="plan-title">Enterprise</h2>

                  <p className="plan-price">
                    $49.99<span>/month</span>
                  </p>

                  <p className="plan-description">
                    Eleifend cursus volutpat risus convallis nam sed quam
                    sollicitudin eget leo at erat cursus justo
                  </p>

                  {tokenn ? (
                    <button className="groth-bt BT" onClick={handlePaymet}>
                      Join Now
                    </button>
                  ) : (
                    <button className="groth-bt BT" onClick={openModal}>
                      Join Now
                    </button>
                  )}
                </div>
              </div>

              <p className="fs-500 mb">Need something different? No problem!</p>
              <div className="center-fl">
                <a href="#" className="groth-bt BT">
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
