//require('dotenv').config();
import React from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation.jsx';
import Signin from '../components/Signin/Signin.jsx';
import Register from '../components/Register/Register.jsx';
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

const initialState = {
  input: '',
  imgUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''

  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''

      }
    }
  }

  loadUser = (user) => {
    this.setState({
      user:{
        id: user.id,
        name: user.name,
        email: user.email,
        entries: user.entries,
        joined: user.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value })
  }

  //button will submit a link for face detection
  onButtonSubmit = () => {
    this.setState({ imgUrl: this.state.input });
    fetch('https://tranquil-dawn-21809.herokuapp.com/imageUrl',{
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
        .then(response => {
          if(response) {
            fetch('https://tranquil-dawn-21809.herokuapp.com/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(console.log);
          }
          this.displayFaceBox(this.calculateFaceLocation(response))
        })
        .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    }
    else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route })
  }

  render() {
    const { input, imgUrl, box, route, isSignedIn, user } = this.state;
    console.log(isSignedIn);
    return(
      <div className='App'>
         <Particles className="particles"
          params={particlesOptions}
         />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { this.state.route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={user.name}
                entries={user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imgUrl={input} />
            </div>
          : (
            this.state.route === 'signin'
            ? <Signin
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
            : <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange}
              />
          )
        }

      </div>
    )
  }
}

export default App;