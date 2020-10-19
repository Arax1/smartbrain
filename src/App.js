import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ColorList from './components/ColorList/ColorList';
import RadioBar from './components/RadioBar/RadioBar';
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

const initState = {
  input: '',
  imageUrl: '',
  box: {},
  radio: 'image',
  route: 'signin',
  isSignedIn: false,

  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  },

  color_hidden: false,
  color_objects: {}
}

class App extends Component {
  constructor() {
    super();
    this.state = initState;
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

  setColorObjects = (data) => {
    this.setState({ color_objects: data.outputs[0].data.colors });
    this.setState({ color_hidden: true })
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  onRadioChange = (event) => {
    this.setState({ radio: event.target.value })
  }

  onSubmit = () => {

    this.setState({ imageUrl: this.state.input });

    if (this.state.radio === 'color') {
      app.models
        .predict(Clarifai.COLOR_MODEL, this.state.input)
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
          }
          this.setColorObjects(response)
        })
        .catch(err => console.log(err));

    }

    else {
      app.models
        .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
        .then(response => {
          if (response) {
            fetch('http://localhost:3000/image', {
              method: 'put',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, { entries: count }))
              })
              .catch(console.log)
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
    }



  }

  onRouteChange = (newroute) => {

    if (newroute === 'signout') {
      this.setState(initState);
    }

    else if (newroute === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: newroute });
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined

      }
    });
  }



  render() {
    const { isSignedIn, box, imageUrl, route, radio, color_objects, color_hidden, user } = this.state;
    let colorlist;
    if (color_hidden) {
      colorlist = <ColorList hexlist={color_objects} />
    }

    else {
      colorlist = null;
    }


    return (
      <div className="App">
        <Particles className='particle'
          params={particleParams}
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        {route === 'home'
          ? <>
            <Logo />
            <Rank name={user.name} entries={user.entries} />
            <RadioBar onRadioChange={this.onRadioChange} />
            <ImageLinkForm onSubmit={this.onSubmit} onInputChange={this.onInputChange} />
            {colorlist}
            <FaceRecognition imageURL={imageUrl} box={box} />
          </>
          : (route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
            : <Register loadUser={this.loadUser} rv={radio} onRouteChange={this.onRouteChange} />
          )
        }
      </div>
    );
  }

}

export default App;
