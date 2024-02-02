import { Component } from "react";

import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";

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
                {this.props.image?.url == null ? null : (
                  <Draggable>
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
