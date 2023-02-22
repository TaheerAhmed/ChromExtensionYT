
/*global chrome*/
import React, { useState, useEffect } from 'react';
import VideoInfo from './components/VideoInfo'
import DownloadButton from './components/DownloadButton';
import Axios from 'axios';
import APIKEY from './.env'
function App() {
  const [videoLink, setVideoLink] = useState('');
  const [url, setUrl] = useState(window.location.href);
  const [showDownloads, setShowDownloads] = useState(false);
  const [data,setData]=useState(null)
  const [downWant,setDownWant]=useState(false)


  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    // get the current window ID
    chrome.windows.getCurrent((window) => {
      // get the URL of the active tab in the current window
      chrome.tabs.query({ active: true, windowId: window.id }, (tabs) => {
        const url = tabs[0].url;
        setCurrentUrl(url);
      });
    });
  }, []);
  useEffect(() => {
    if (currentUrl.includes("https://www.youtube.com/watch")){
      setShowDownloads(true)
      setVideoLink(window.location.href);
      
      console.log("We Here")
      
    }
    // Listen for changes in the URL bar

  }, [currentUrl]);

  async function submitHandler() {
    setDownWant(true)
    const options = {
      method: 'GET',
      url: 'https://aiov-download-youtube-videos.p.rapidapi.com/GetVideoDetails',
      params: { URL: currentUrl },
      headers: {
        'X-RapidAPI-Key': APIKEY,
        'X-RapidAPI-Host': 'aiov-download-youtube-videos.p.rapidapi.com'
      }
    };
    Axios.request(options).then(function (response) {
      console.log(response.data);
      // console.log(response.data.formats.filter(item => item.video_ext !== "none" && item.acodec!=="none"))
      setData(response.data)
    }).catch(function (error) {
      console.error(error);
    });
    // setData(data);
  }
console.log(data)
  return (
    <div>{showDownloads?
    (downWant&&data!=null?<div>
      <h1>YouTube Downloader</h1>
      <VideoInfo videoInfo={data} />
      {videoLink && 

          data.formats.filter(item => item.video_ext !== "none" && item.acodec !== "none").map((value, index) => (
            <DownloadButton videoLink={value.url} format={value.video_ext} quality={value.format_note}/>

            // <Col key={index} xs={24} md={3}>
            //   <Button
            //     download
            //     href={value.url}
            //     target="_self"
            //     type="primary"
            //   >
            //     {value.vcodec}
            //     {value.video_ext}
            //   </Button>
            // </Col>

            // <div>
            //   HELLO
            //   {value.vcodec}
            //  {value.video_ext}
            // </div>
          ))
        // <DownloadButton videoLink={videoLink} format={format}/>
      }
    </div>:<div><button type='button' onClick={submitHandler}>Would Like to Download this Video </button></div>):
    
    (<div>
      You need to go a youtube video first to see the download options available for a video to download 
    </div>)}
    </div>
  );
}

export default App;
