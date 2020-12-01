import React from 'react';
import Navigation from '../components/Navigation/Navigation.jsx';
import Logo from '../components/Logo/Logo.jsx';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm.jsx';
import './App.css';
import 'tachyons';

class App extends React.Component {
  render() {
    return(
      <div className='App'>
        <Navigation />
        <Logo />
        <ImageLinkForm />
       {/* {

        <FaceRecognition />} */}
      </div>
    )
  }
}

export default App;