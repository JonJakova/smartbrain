import React, { Component } from 'react';
import './App.css';
import { particleOption } from '../../components/configurations/ParticleConfig';
import Navigator from '../../components/Navigator/Navigator';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import Signin from '../../components/Signin/Signin';
import Register from '../../components/Register/Register';

const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user:
  {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  updateUser = (data) => {
    this.setState(
      {
        user:
        {
          id: data.id,
          name: data.name,
          email: data.email,
          entries: data.entries,
          joined: data.joined
        }
      }
    )
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  onChangeLink = (event) => {
    this.setState({ input: event.target.value })
  }

  onClickDetect = () => {
    this.setState({imgUrl: this.state.input});
      fetch('https://rocky-hamlet-85621.herokuapp.com/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('https://rocky-hamlet-85621.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)
        }
        this._setFaceBox(this._calculateFaceCoordinates(response))
      })
      .catch(err => console.log(err));
  }

  render() {
    const { route, isSignedIn } = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleOption} />
        <Navigator isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        {
          route === 'home'
            ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries} />
              <ImageLinkForm onChangeLink={this.onChangeLink} onClickDetect={this.onClickDetect} />
              <FaceRecognition box={this.state.box} imgUrl={this.state.imgUrl} />
            </div>
            : (route === 'signin'
              ? <div>
                <Logo />
                <Signin updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
              </div>
              : <div>
                <Logo />
                <Register updateUser={this.updateUser} onRouteChange={this.onRouteChange} />
              </div>)
        }
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
  }

}

export default App;