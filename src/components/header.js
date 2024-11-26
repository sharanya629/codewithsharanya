import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthProvider";

export const Header = () => {
  const { token, signout } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg px-5 bg-body-secondary">
      <div className="container-fluid justify-content-between">
        <Link className="navbar-brand" to="/">
          <span className="d-flex align-items-center" style={{ gap: "0.5rem" }}>
            <img
              src="/images/logo1.png"
              alt="Logo"
              width="40"
              className="d-inline-block"
            />
            Smart Tutor
          </span>
        </Link>
        {token && <div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav" style={{ gap: '1rem' }}>
              <Link className="nav-link position-relative" to="/student/notifications">Notifications
                <span className="position-absolute top-1 translate-middle badge rounded-pill bg-danger">
                  99+
                  <span className="visually-hidden">unread messages</span>
                </span>
              </Link>
              <Link className="nav-link" to="/student/profile">Profile</Link>
              <button className="nav-link" onClick={signout}>Logout</button>
            </div>
          </div>
        </div>}
      </div>
    </nav>
  );
};