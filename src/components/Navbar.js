import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark px-0 py-3 sticky-top"
      style={{
        backgroundColor: "#022d45",
        height: "70px",
        width: "100%",
      }}
    >
      <div className="container-xl">
        <Link className="navbar-brand" to="/">
          <h2 className="text-white logoFont">HydroMetLab</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav mx-lg-auto">
            <Link className="nav-item nav-link active" to="/">
              Home
            </Link>
            <Link className="nav-item nav-link" to="/team">
              Team
            </Link>
            <Link className="nav-item nav-link" to="/publications">
              Publications
            </Link>
            <Link className="nav-item nav-link" to="/outreach">
              Outreach
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
