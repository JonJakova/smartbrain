import React, { Fragment } from 'react';

function Rank({name, entries}) {
    return (
        <Fragment>
            <div className='white f3'>
            {`${name}, your current entry count is...`}
            </div>
            <div className='white f1'>
                {entries}
            </div>
        </Fragment>
    );
}

export default Rank;