import { Component } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";

class Display extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
          {this.props.pdfFile ? (
            <>
              <div style={{ position: "relative" }}>
                {/* PDF Viewer */}
                <Viewer fileUrl={this.props.pdfFile} />

                {/* Image */}
                {this.props.image?.url == null ? (
                  null
                ) : (
                  <img
                    src={this.props.image?.url}
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      top: 12,
                      left: "50%",
                      width: 200,
                      height: 150,
                      objectFit: "contain",
                      border:"1px solid black"
                    }}
                  />
                )}
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
