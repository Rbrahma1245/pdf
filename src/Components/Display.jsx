import { Component } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import html2pdf from "html2pdf.js";

class Display extends Component {
  constructor() {
    super();
    this.state = {
      updatedPDF: null,
    };
  }
  handleDownload = () => {
    console.log("click");
    // const { pdfFile } = this.props;
    // // Save the PDF file
    // saveAs(pdfFile, "downloaded_pdf.pdf");

    const element = document.getElementById("pdf-container");

    html2pdf(element, {
      margin: 10,
      filename: "downloaded_pdf.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };

  render() {
    console.log(this.props);

    return (
      <div style={{ width: "80%" }} id="pdf-container">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
          {this.props.pdfFile ? (
            <>
              <div style={{ position: "relative" }}>
                {/* PDF Viewer */}
                <Viewer fileUrl={this.props.pdfFile} />

                {/* Image */}
                {this.props.image?.url == null ? null : (
                  <Draggable bounds="parent">
                    <Resizable
                      defaultSize={{
                        width: 200,
                        height: 150,
                      }}
                      style={{
                        background: `url(${this.props.image.url})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        position: "absolute",
                        zIndex: 1,
                        top: 12,
                        left: "50%",
                        objectFit: "contain",
                        border: "1px solid black",
                      }}
                      lockAspectRatio={true}
                    ></Resizable>
                  </Draggable>
                )}
              </div>
              <div style={{ marginTop: 10 }}>
                <button onClick={this.handleDownload.bind(this)}>
                  Download PDF
                </button>
              </div>
            </>
          ) : (
            <>NO PDF</>
          )}
        </Worker>
      </div>
    );
  }
}

export default Display;
