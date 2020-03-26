import React from 'react';
import './App.css';
import Navigator from '../../components/Navigator/Navigator';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../../components/ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import Particles from 'react-particles-js';
import {particleOption} from '../../components/configurations/ParticleConfig';

function App() {
  return (
    <div className="App">
     <Particles className='particles' params={particleOption}/>
      <Navigator />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* <Logo />
      <ImageLinkForm />
      <FaceRecognition /> */}
    </div>
  );
}

export default App;
