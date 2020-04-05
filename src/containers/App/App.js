import React, { Component } from 'react';
import './App.css';
import { particleOption } from '../../components/configurations/ParticleConfig';
import {keys} from '../../components/configurations/ApiKeys';
import Navigator from '../../components/Navigator/Navigator';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import Signin from '../../components/Signin/Signin';
import Register from '../../components/Register/Register';

const appKey = new Clarifai.App({
  apiKey: keys.clarifai
});

class App extends Component {
  constructor() {
    super();
    this.state =
    {
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
  }

  componentDidMount() {
    fetch('http://localhost:3001')
      .then(resp => resp.json())
      .then(console.log)
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
    console.log('update User', data);
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false })
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
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
          .then(response => 
            {
              if(response){
                fetch('http://localhost:3001/image',
                {
                  method: 'PUT',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify(
                    {
                      id: this.state.user.id
                    }
                  )
                })
                .then(resp => resp.json())
                .then(count => 
                  {
                    this.setState(Object.assign(this.state.user, {entries: count}));
                  })
              }
            this._setFaceBox(this._calculateFaceCoordinates(response))
            })
          .catch(err => console.log(err))
      });
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
    // console.log(data);
    // const faceList = data.outputs[0].data.regions;
    // const imageTemp = document.getElementById('faceId');
    // const widthTemp = Number(imageTemp.width);
    // const heightTemp = Number(imageTemp.height);
    // const faceCoordinateList = faceList.map(area => 
    //   {
    //     const region = area.region_info.bounding_box;
    //     return {
    //       leftCol: region.left_col * widthTemp,
    //       topRow: region.top_row * heightTemp,
    //       rightCol: widthTemp - (region.right_col * widthTemp),
    //       bottomRow: heightTemp - (region.bottom_row * heightTemp)
    //     }
    //   });
    //   console.log(faceCoordinateList);


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