import React from 'react'
import Spinner from './spinner.gif'
const  Loader = ()=> {
    return (
      <div className='text-center'>
        <img src={Spinner} alt="loading..." style={{height:"30px"}} className='my-3'></img>
      </div>
    )
}

export default  Loader;
