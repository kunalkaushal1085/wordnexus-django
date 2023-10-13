import React, { useState } from "react";
import logo from "../../assets/images/vecteezy_realestate-logo-design-icon-template_12650609.jpg";
import { UploadModal } from "../modal/modal";
import { useDispatch } from "react-redux";
import { logoutApi } from "../../redux/auth/authslice";
import { useNavigate } from "react-router-dom";
export const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenn = localStorage.getItem("token");

  const handleLogOut = () => {
    dispatch(logoutApi({ tokenn, navigate }));
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <UploadModal isOpen={showModal} onClose={closeModal} />
      <section className="custom-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                  <a className="navbar-brand" href="#">
                    <img src={logo} alt="" />
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className=" navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                      {tokenn ? (
                        <li className="nav-item">
                          <button
                            className="nav-link active"
                            aria-current="page"
                            onClick={handleLogOut}
                          >
                            logout
                          </button>
                        </li>
                      ) : (
                        <li className="nav-item">
                          <button
                            className="nav-link active"
                            aria-current="page"
                            onClick={openModal}
                          >
                            Login
                          </button>
                        </li>
                      )}

                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Features
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Pricing
                        </a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">
                          Contact Us
                        </a>
                      </li>
                      <li>
                        <button className="Get-Started BT">Get Started</button>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
