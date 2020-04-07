import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';
import 'tachyons';


const app = new Clarifai.App({
  apiKey: 'a5e2622354b94ef8a0814eff543bb828'
})

const particleParams = {

  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 600
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarafaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarafaiFace.left_col * width,
      topRow: clarafaiFace.top_row * height,
      rightCol: width - (clarafaiFace.right_col * width),
      bottomRow: height - (clarafaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onSubmit = () => {

    this.setState({ imageUrl: this.state.input });

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));

  }

  onRouteChange = (newroute) => {
    console.log(newroute);
    if (newroute === 'signout') {
      this.setState({ isSignedIn: false })
    }

    else if (newroute === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: newroute });
  }

  render() {
    const { isSignedIn, box, imageUrl, route } = this.state;

    return (
      <div className="App">
        <Particles className='particle'
          params={particleParams}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home'
          ? <>
            <Logo />
            <Rank />
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
            <FaceRecognition imageURL={imageUrl} box={box} />
          </>
          : (route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }

}

export default App;
