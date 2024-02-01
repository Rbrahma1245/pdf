import { Component } from "react";
import { Document, Page } from "react-pdf";

class Display extends Component {
  constructor() {
    super();
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };
  goToPrevPage() {
    this.setState({
      numPages: this.state.pageNumber - 1 <= 1 ? 1 : this.state.pageNumber - 1,
    });
  }

  goToNextPage() {
    this.setState({
      pageNumber:
        this.state.pageNumber + 1 >= this.state.numPages
          ? this.state.numPages
          : this.state.pageNumber + 1,
    });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.goToPrevPage.bind(this)}>Prev</button>
          <button onClick={this.goToNextPage.bind(this)}>Next</button>
          <p>
            Page {this.state.pageNumber} of {this.state.numPages}
          </p>
        </div>

        <Document
          file="document.pdf"
          onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
      </div>
    );
  }
}

export default Display;
