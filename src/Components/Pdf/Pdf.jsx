import { Component } from "react";
import "./Pdf.scss";
import Display from "../Display";

class Pdf extends Component {
  constructor() {
    super();
    this.state = {
      file: null,
      pageNo: 1,
    };
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
        <Display file={this.state.file} />
      </div>
    );
  }
}

export default Pdf;
