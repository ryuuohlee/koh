import React from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation.jsx';
import Logo from '../components/Logo/Logo.jsx';
import Rank from '../components/Rank/Rank.jsx';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.jsx';
import './App.css';
import 'tachyons';

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
  render() {
    return(
      <div className='App'>
         <Particles className="particles"
          params={particlesOptions}
         />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
       {/* {

        <FaceRecognition />} */}
      </div>
    )
  }
}

export default App;