import { Component } from "react";
import logo from "../../Images/logo.jpg";
import "./Header.scss";

import { FaDownload, FaFileUpload } from "react-icons/fa";

export class Header extends Component {
  render() {
    return (
      <div className="header-container" style={{ display: "flex" }}>
        <div className="header-left">
          <img src={logo} alt="logo" />
        </div>
        <div className="header-right">
          <button className="upload">
            <FaFileUpload />
          </button>

          <button className="download">
            <FaDownload />
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
