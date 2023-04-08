
/*global chrome*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIKEY from './.env'
import YTNeed from './components/YTNeed';
import VideoDownload from './components/VideoDownload';
function App() {
  const [videoLink, setVideoLink] = useState('');

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

    axios.request(options).then(function (response) {

      setData(response.data)
    }).catch(function (error) {

    });
    // setData(data);
  }
console.log(data)
  return (
    <div>{showDownloads?
    (downWant&&data!=null?<div>
      <VideoDownload data={data} videoLink={videoLink} />
    </div>:<div className='w-[400px] h-[400px] text-xl'><button type='button' className='btn btn-primary bg-green' onClick={submitHandler}>Would Like to Download this Video </button></div>):
    
    (<YTNeed/>)}
    </div>
  );
}

export default App;
