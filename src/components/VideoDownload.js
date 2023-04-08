import React from 'react'
import VideoInfo from './VideoInfo'
import DownloadButton from './DownloadButton'
const VideoDownload = (props) => {
  return (
    <div className='w-[400px] h-[400px]'>
          <h1 className='text-center'>YouTube Downloader</h1>
          <div>
          <VideoInfo videoInfo={props.data} />
          {props.videoLink &&
              props.data.formats.filter(item => item.video_ext !== "none" && item.acodec !== "none" && item.format_note !== "144p").map((value, index) => (
                 <div className='text-md'> <DownloadButton videoLink={value.url} format={value.video_ext} quality={value.format_note} vidUrl={value.fullTitle} /></div>
              ))
          }
          </div>
      </div>
    
  )
}

export default VideoDownload
