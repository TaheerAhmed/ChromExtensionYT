import React, { useState } from 'react';
import "./VideoInfo.css"
import '../index.css'
function VideoInfo(props) {    
    console.log(props)

    return (
        <div className=''>
            
            <div className='text-[#ff1010] '>
                <p className='text-lg xy'>Title:</p> <p className='text-md xy'>{props.videoInfo.fulltitle}</p>
                    <p className='text-lg xy'>Author Name:</p> <p className='text-md xy'>{props.videoInfo.channel}</p>
                <p className='text-lg xy'>Thumbnail:</p> <img  className=" imagename w-[400px] h-[170px] object-cover border-gray-400 border-2"src={props.videoInfo.thumbnail} alt="Thumbnail for video " />
                </div>
        </div>
    );
}

export default VideoInfo;
