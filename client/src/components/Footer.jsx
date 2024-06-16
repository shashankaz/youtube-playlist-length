import React from "react";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">
      <p>
        Copyright © {year}{" "}
        <a href="https://www.shashankk.tech/" target="_blank" rel="noreferrer">
          Shashank
        </a>
        . All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
