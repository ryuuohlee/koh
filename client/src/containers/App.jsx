import React from 'react';
import Navigation from '../components/Navigation/Navigation.jsx';

class App extends React.Component {
  render() {
    return(
      <div className='App'>
        <Navigation />
       {/* { <Logo />
        <ImageLinkForm />
        <FaceRecognition />} */}
      </div>
    )
  }
}

export default App;