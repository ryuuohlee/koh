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
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      imgUrl: '',
      box: {},
    }

    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
    //this.calculateFaceLocation = this.calculateFaceLocation.bind(this);
    this.displayFaceBox = this.displayFaceBox.bind(this);
  }

  calculateFaceLocation = (data) => {
    console.log(data)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox(box) {
    console.log(box)
    this.setState({ box: box });
  }

  onInputChange(event) {
    this.setState({ input: event.target.value })
  }

  onButtonSubmit() {
    this.setState({ imgUrl: this.state.input }, function(){
      app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.imgUrl)
      .then(
          function(response) {
          // do something with response
          //this.displayFaceBox(this.calculateFaceLocation(response));
          this.calculateFaceLocation(response)
          // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        }
      )
      .catch(
        function(err) {
          // there was an error
          console.log(err)
        });
      });
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