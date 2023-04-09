import React from 'react'
import VideoInfo from './VideoInfo'
import DownloadButton from './DownloadButton'
const VideoDownload = (props) => {
  return (
    <div className='w-[400px] h-[640px] bg-black overflow-hidden'>
      <h1 className='text-center text-2xl bg-[#ff1010] text-black'>YouTube Downloader</h1>
      <h2 className='text-xl text-[#ff1010] p-2'>Video Information</h2>
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
