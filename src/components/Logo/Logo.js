import React from 'react';
import Tilt from 'react-tilt';
import logo from './logo.png'

function Logo() {
    return (
        <div className='ma4 mt0'>
            <Tilt className="Tilt br2 shadow-2" options={{ max: 35 }} style={{ height: 200, width: 200 }} >
                <div className="Tilt-inner pa3">
                    <img alt='logo' src={logo}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;