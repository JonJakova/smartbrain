import React from 'react';

function FaceRecognition({ imgUrl }) {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img style={{width: '500px', height: 'auto'}} src={imgUrl} alt='img' />
            </div>
        </div>
    );
}

export default FaceRecognition;