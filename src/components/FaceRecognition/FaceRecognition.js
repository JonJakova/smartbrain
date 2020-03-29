import React from 'react';
import './FaceRecognition.css'

function FaceRecognition({ imgUrl, box }) {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='faceId' style={{ width: '500px', height: 'auto' }} src={imgUrl} alt='' />
                <div className='boundingBox'
                    style={{ top: box.topRow, bottom: box.bottomRow, right: box.rightCol, left: box.leftCol }}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;