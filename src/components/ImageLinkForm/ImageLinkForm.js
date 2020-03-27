import React, { Fragment } from 'react';
import './ImageLinkForm.css'

function ImageLinkForm({onChangeLink, onClickDetect}) {
    return (
        <Fragment>
            <div>
                <p className='f3'>
                    {'Identify faces in your image with some AI magic.'}
                </p>
                <div className='center'>
                    <div className='center form pa4 br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type='tex' onChange={onChangeLink}/>
                        <button className='w-30 grow f4 link ph3 pv2 dib white bg-blue' onClick={onClickDetect}>
                            Detect
                        </button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}

export default ImageLinkForm;