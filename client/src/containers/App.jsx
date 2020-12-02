//require('dotenv').config();
import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation.jsx';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition.jsx';
import Logo from '../components/Logo/Logo.jsx';
import Rank from '../components/Rank/Rank.jsx';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.jsx';
import './App.css';
import 'tachyons';

const app = new Clarifai.App({
  apiKey: '8d9808a321e24c99a10fc32bd8b24d48'
 });

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      }
    },
    color: "#242424",
    line_linked: {
      color: "#242424"
    }
  }
}

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imgUrl: ''
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit() {
    console.log(this.state.input)
    this.setState({ imgUrl: this.state.input });
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.imgUrl)
      .then(
      function(response) {
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        // there was an error
      }
    );
  }

  render() {
    return(
      <div className='App'>
         <Particles className="particles"
          params={particlesOptions}
         />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imgUrl={this.state.input}/>
      </div>
    )
  }
}

export default App;