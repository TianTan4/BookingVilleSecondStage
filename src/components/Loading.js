import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'
export default function Loading() {
    return (
        <div className='loading'>
        <h4>rooms are loading...</h4>
        <h4>If long time without replying, please login first</h4>
          <img src={loadingGif} alt='loading'/>  
        </div>
    )
}
