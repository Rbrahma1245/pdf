import { Component } from "react";
import { pdfjs } from 'react-pdf';
import "./Pdf/Pdf.scss"
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

import Draggable from "react-draggable";
import { Resizable } from "re-resizable";


class Display extends Component {
  constructor() {
    super();
    this.state = {
      updatedPDF: null,
      numPages: null,
      pageNumber: 1,

      imagePosition: { x: 200, y: 500 }, // Initial position
      imageSize: { width: 200, height: 150 }, // Initial size
    };
  }
  async handleDownloadPDF() {
    const { pdfFile } = this.props;

    if (!pdfFile) {
      console.error('PDF file is not available.');
      return;
    }

    try {
      const pdfBytes = new Uint8Array(await pdfFile.arrayBuffer());
      const pdfDoc = await PDFDocument.load(pdfBytes);

      // Load the image
      const imageBytes = await fetch(this.props.image.url).then((res) => res.arrayBuffer());

      // Embed the image
      const image = await pdfDoc.embedJpg(this.props.image.url);

      pdfDoc.getPages().forEach((page) => {
        const { width, height } = page.getSize();

        const x = this.state.imagePosition.x;
        const y = this.state.imagePosition.y;
        const imageWidth = this.state.imageSize.width;
        const imageHeight = this.state.imageSize.height;

        page.drawImage(image, {
          x: x,
          y: y,
          width: imageWidth,
          height: imageHeight,
        });
      });

      const modifiedPdfBytes = await pdfDoc.save();
      saveAs(new Blob([modifiedPdfBytes], { type: 'application/pdf' }), 'downloaded_pdf_with_image.pdf');
    } catch (error) {
      console.error('Error adding image to PDF:', error);
    }
  };


  onDocumentLoadSuccess({ numPages }) {
    this.setState({ numPages: numPages });
  }


  handleNextPage() {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  }

  handlePrevPage() {
    this.setState((prevState) => ({
      pageNumber: prevState.pageNumber - 1,
    }));
  }

  handleImageDrag = (event, data) => {
    this.setState({
      imagePosition: { x: data.x, y: data.y },
    });

    console.log(this.state.imagePosition);
  };

  handleImageResize = (event, direction, ref, delta) => {
    // Update the state with the new size
    this.setState({
      imageSize: {
        width: delta.width,
        height: delta.height,
      }
    })
  };

  render() {
    console.log(this.props.pdfFile);

    return (
      <div style={{ width: "80%" }}>

        {this.props.pdfFile ? (
          <>
            <div className="container-box">
              <Document file={this.props.pdfFile} onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}>
                <Page pageNumber={this.state.pageNumber} >

                  {this.props.image?.url == null ? null : (
                    <Draggable bounds="parent" onDrag={this.handleImageDrag.bind(this)}>
                      <Resizable
                        onResize={this.handleImageResize.bind(this)}
                        defaultSize={{
                          width: 200,
                          height: 150,
                        }}
                        style={{
                          background: `url(${this.props.image.url})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                          position: "absolute",
                          zIndex: 5,
                          top: 12,
                          left: "50%",
                          objectFit: "contain",
                          border: "1px solid black",
                        }}
                        lockAspectRatio={true}
                      ></Resizable>
                    </Draggable>
                  )}
                </Page>

                <p>
                  Page {this.state.pageNumber} of {this.state.numPages}
                </p>

                <button onClick={this.handlePrevPage.bind(this)} disabled={this.state.pageNumber === 1}>Prev</button>
                <button onClick={this.handleNextPage.bind(this)} disabled={this.state.pageNumber == this.state.numPages}>Next</button>

              </Document>
            </div>

            <div style={{ marginTop: 10 }}>
              <button onClick={this.handleDownloadPDF.bind(this)}>
                Download PDF
              </button>
            </div>
          </>
        ) : (
          <>NO PDF</>
        )}

      </div>

    );
  }
}

export default Display;
