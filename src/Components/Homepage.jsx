import { Component } from "react";
import "./Pdf/Pdf.scss";
import Display from "./Display";

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      pdfFile: null,
      pageNo: 1,
    };
  }

  validatePDF(e) {
    let selectedFile = e.target.files[0];
    let fileType = ["application/pdf"];

    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();

        reader.readAsDataURL(selectedFile);
        reader.onload = (e) => {
          this.setState({ pdfFile: e.target.result });
        };
      } else {
        this.setState({ pdfFile: null });
      }
    } else {
      console.log("please select a file");
    }
  }

  render() {
    return (
      <div>
        <h2>Upload PDF</h2>
        <div className="display-container">
          <div>
            <input
              type="file"
              accept=".pdf"
              onChange={this.validatePDF.bind(this)}
            />
          </div>
        </div>

        <Display pdfFile={this.state.pdfFile} image={this.props.image}/>
      </div>
    );
  }
}

export default Homepage;
