import { Component } from "react";
import logo from "../../Images/logo.jpg";
import "./Header.scss";
import { Tooltip } from "react-tooltip";
import { FaDownload, FaFileUpload } from "react-icons/fa";
import Swal from "sweetalert2";

export class Header extends Component {
  constructor() {
    super();
  }

  handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type === "image/png") {
      const reader = new FileReader();

      reader.onloadend = () => {
        this.props.addImage({
          url: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Invalid Image",
        text: "Please select a valid PNG file.",
      });
    }
  };

  render() {
    return (
      <div className="header-container" style={{ display: "flex" }}>
        <div className="header-left">
          <img src={logo} alt="logo" />
        </div>
        <div className="header-right">
          <button
            className="upload"
            data-tooltip-id="upload-image"
            data-tooltip-content="Upload PNG file"
          >
            <Tooltip id="upload-image" place="bottom" />

            <input
              className="file-input"
              type="file"
              onChange={this.handleImageChange.bind(this)}
            />
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
