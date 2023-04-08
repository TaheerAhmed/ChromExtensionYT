import React, { useState, useEffect } from 'react'
import useDownloader from 'react-use-downloader'
import axios from 'axios'
import Button from 'react-bootstrap/Button';
function DownloadButton(props) {
    // const [formats, setFormats] = useState([]);
    const [downloadLink, setDownloadLink] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);
    const { size, elapsed, percentage, download, cancel, error, isInProgress } =
        useDownloader();

   
    function DownloadButton() {
        const link = props.videoLink
        
 
            const a = document.createElement('a');
            a.href = link;
            a.target = '_blank';
            a.click();
        return (
            <div>
                
                <div>{error && <p>{JSON.stringify(error)}</p>}</div>
            </div>
        );
    }
    const handleDownloadClick = () => {
        // Generate download link
        const link = props.videoLink
        console.log(link)
        setDownloadLink(link);
        setIsDownloading(true);
       
    };

    return (
        <div className='border-gray-400 border bg-gray-100'>
            <h2 className='text-xl'>Download Video</h2>
            <div>
                <div className='m-1 text-md'>
                    {props.quality}

                </div>
                
                {/* <button onClick={handleDownloadClick} disabled={isDownloading}>Download</button> */}
               
                <div className='rounded-lg bg-red-500 p-2 text-lg cursor-pointer' onClick={DownloadButton}>
                    Download
                </div>
            </div>
            
        </div>
    );
}

export default DownloadButton;

// import React, { useState, useEffect } from 'react';
// import ytdl from 'ytdl-core';

// function DownloadButton({ videoLink }) {
//     const [formats, setFormats] = useState([]);
//     const [selectedFormat, setSelectedFormat] = useState('');
//     const [downloadLink, setDownloadLink] = useState('');
//     const [downloadProgress, setDownloadProgress] = useState(0);
//     const [isDownloading, setIsDownloading] = useState(false);

//     useEffect(() => {
//         // Fetch available formats
//         ytdl.getInfo(videoLink)
//             .then(info => {
//                 const formats = ytdl.filterFormats(info.formats, 'videoonly');
//                 setFormats(formats);
//                 setSelectedFormat(formats[0].itag);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     }, [videoLink]);

//     const handleFormatChange = (event) => {
//         setSelectedFormat(event.target.value);
//     };

//     const handleDownloadClick = () => {
//         // Generate download link
//         const stream = ytdl(videoLink, { quality: selectedFormat });

//         setIsDownloading(true);

//         // Listen for download progress
//         let downloaded = 0;
//         stream.on('progress', (chunkLength, downloadedBytes, totalBytes) => {
//             downloaded += chunkLength;
//             setDownloadProgress(downloaded / totalBytes * 100);
//         });

//         // Start download
//         ytdl.getBasicInfo(videoLink)
//             .then(info => {
//                 const filename = `${info.videoDetails.title}.mp4`;
//                 const url = window.URL.createObjectURL(stream);
//                 const a = document.createElement('a');
//                 a.href = url;
//                 a.download = filename;
//                 document.body.appendChild(a);
//                 a.click();
//                 a.remove();
//             })
//             .then(() => {
//                 setIsDownloading(false);
//                 setDownloadProgress(0);
//             })
//             .catch(error => {
//                 console.log(error);
//             });
//     };

//     return (
//         <div>
//             <h2>Download Video</h2>
//             <div>
//                 <label htmlFor="format-select">Format:</label>
//                 <select id="format-select" value={selectedFormat} onChange={handleFormatChange}>
//                     {formats.map(format => (
//                         <option key={format.itag} value={format.itag}>{format.resolution}</option>
//                     ))}
//                 </select>
//                 <button onClick={handleDownloadClick} disabled={!selectedFormat || isDownloading}>Download</button>
//             </div>
//             {isDownloading &&
//                 <div>
//                     <p>Download progress: {downloadProgress.toFixed(2)}%</p>
//                 </div>
//             }
//         </div>
//     );
// }

// export default DownloadButton;
