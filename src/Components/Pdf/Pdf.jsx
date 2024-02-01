import { Component } from "react";
import Header from "../Header/Header";
import Homepage from "../Homepage";

export class Pdf extends Component {
  constructor(){
    super()
    this.state = {image : null}
  }


  addImage = (imageUrl) => {
    this.setState({image : imageUrl});
  };
  render() {
    // console.log(this.state.image);
    return (
      <div>
        <Header addImage={this.addImage}/>
        <Homepage  image = {this.state.image}/>
      </div>
    );
  }
}

export default Pdf;
