import React from 'react';
//import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl }) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img alt='' src={imgUrl} width='500px' height='auto' />
      </div>
    </div>
  )
}

export default FaceRecognition;