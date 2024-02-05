import { Component } from "react";
import "./Pdf/Pdf.scss";
import Display from "./Display";
// import Swal from "sweetalert2";



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

            reader.onload = (e) => {
                const arrayBuffer = e.target.result;
                const blob = new Blob([arrayBuffer], { type: "application/pdf" });
                this.setState({ pdfFile: blob });
            };

            reader.readAsArrayBuffer(selectedFile);
        } else {
          // Swal.fire({
          //   icon: 'error',
          //   title: 'Invalid File',
          //   text: 'Please select a valid PDF file.',
          // });
            this.setState({ pdfFile: null });
            e.target.value = "";
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
