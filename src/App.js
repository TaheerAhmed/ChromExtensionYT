
/*global chrome*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import youtube from './assets/youtube.png'
import APIKEY from './.env'
import YTNeed from './components/YTNeed';
import VideoDownload from './components/VideoDownload';
import { Levels } from 'react-activity';
import "react-activity/dist/library.css";
function App() {
  const [videoLink, setVideoLink] = useState('');

  const [showDownloads, setShowDownloads] = useState(false);
  const [data,setData]=useState(null)
  const [downWant,setDownWant]=useState(false)
  const [activity, setActivity] = useState(false)


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
    setActivity(true)
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

    axios.request(options).then(
      
      function (response) {
        setActivity(false)
      setData(response.data)
    }).catch(function (error) {
console.log(error)
    });
    // setData(data);
  }
console.log(data)
  return (
    <div className='w-[400px] h-[400px]'>{showDownloads?
    (downWant&&data!=null?<div>
      <VideoDownload data={data} videoLink={videoLink} />
    </div>:
    <div className='w-[400px] h-[400px] text-xl text-center bg-black '>
          {!activity ? (<button type='button' className='bg-[#ff1010] text-white  text-3xl mx-auto py-[125px] hover:bg-[#000000] hover:text-[#ff1010] items-center justify-center' onClick={submitHandler}>
            <img className='w-[80px] h-[80px] ml-[160px] ' src={youtube} alt="youtube logo"/>
            Would you like to download this Youtube video </button>) : 
            <div className=' w-[400px] h-[400px] text-[#ff1010]'><Levels color="#ff1010" size={122} speed={1} animating={true} className='py-[100px]' />Just a sec.</div>}
        </div>):
    
    (<YTNeed/>)}
    </div>
  );
}

export default App;
