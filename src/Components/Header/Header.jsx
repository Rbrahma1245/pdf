import { Component } from "react";
import logo from "../../Images/logo.jpg";
import "./Header.scss";

import { FaDownload, FaFileUpload } from "react-icons/fa";

export class Header extends Component {
  constructor() {
    super();
   
  }

  handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      this.props.addImage({
        url: reader.result,
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  render() {
 
    return (
      <div className="header-container" style={{ display: "flex" }}>
        <div className="header-left">
          <img src={logo} alt="logo" />
        </div>
        <div className="header-right">
          <FaFileUpload />
          <input
            style={{ width: "80px" }}
            type="file"
            onChange={this.handleImageChange.bind(this)}
          />
          {/* <button
            className="upload"
            onClick={this.handleImageUpload.bind(this)}
          >
            <FaFileUpload />
          </button> */}

          <button className="download">
            <FaDownload />
          </button>
        </div>
      </div>
    );
  }
}

export default Header;
