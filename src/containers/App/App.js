import React, { Component } from 'react';
import './App.css';
import Navigator from '../../components/Navigator/Navigator';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import { particleOption } from '../../components/configurations/ParticleConfig';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';

const appKey = new Clarifai.App({
  apiKey: 'e61e419baf054bf7b286b0e321eab815'
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imgUrl: '',
      box: {}
    };
  }

  onChangeLink = (event) => {
    this.setState({ input: event.target.value })
    console.log(this.state.input);
  }

  onClickDetect = () => {
    this.setState({ imgUrl: this.state.input },
      () => {
        appKey.models
          .predict(Clarifai.FACE_DETECT_MODEL, this.state.imgUrl)
          .then(response => this._setFaceBox(this._calculateFaceCoordinates(response)))
          .catch(err => console.log(err))
      });
  }

  render() {
    return (
      <div className="App">
        <Particles className='particles' params={particleOption} />
        <Navigator />
        <Logo />
        <Rank />
        <ImageLinkForm onChangeLink={this.onChangeLink} onClickDetect={this.onClickDetect} />
        <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
      </div>
    );
  };

  _calculateFaceCoordinates = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('faceId');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - (face.right_col * width),
      bottomRow: height - (face.bottom_row * height)
    }
  }

  _setFaceBox = (box) => {
    this.setState({ box: box });
    console.log(box);
  }

}

export default App;