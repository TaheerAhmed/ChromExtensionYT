import React, { useState } from 'react';
import "./VideoInfo.css"
function VideoInfo(props) {    
    console.log(props)

    return (
        <div className='VideoInfo'>
            <h2>Video Information</h2>
                <div>
                    <p>Title: {props.videoInfo.fulltitle}</p>
                    <p>Author Name: {props.videoInfo.channel}</p>
                    <p>Thumbnail URL: <img src={props.videoInfo.thumbnail} alt="Thumbnail for video " /></p>
                </div>
        </div>
    );
}

export default VideoInfo;
