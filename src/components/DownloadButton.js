import React, { useState, useEffect } from 'react';

function DownloadButton(props) {
    // const [formats, setFormats] = useState([]);
    const [downloadLink, setDownloadLink] = useState('');
    const [downloadProgress, setDownloadProgress] = useState(0);
    const [isDownloading, setIsDownloading] = useState(false);

    // useEffect(() => {
    //     // Fetch available formats
    //     fetch(`https://api.youtubemultidownloader.com/video_formats?url=${videoLink}`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setFormats(data.formats);
    //             setSelectedFormat(data.formats[0].itag);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, [videoLink]);

    // const handleFormatChange = (event) => {
    //     setSelectedFormat(event.target.value);
    // };

    const handleDownloadClick = () => {
        // Generate download link
        const link = props.videoLink
        console.log(link)
        setDownloadLink(link);
        setIsDownloading(true);

        // Start download
        fetch(link)
            .then(response => {
                console.log(response)
                // Set download progress
                const total = parseInt(response.headers.get('content-length'));
                let downloaded = 0;
                const reader = response.body.getReader();
                return new ReadableStream({
                    start(controller) {
                        function pump() {
                            reader.read().then(({ done, value }) => {
                                if (done) {
                                    controller.close();
                                    return;
                                }
                                downloaded += value.byteLength;
                                setDownloadProgress(downloaded / total * 100);
                                controller.enqueue(value);
                                pump();
                            });
                        }
                        pump();
                    }
                });
            })
            .then(stream => new Response(stream))
            .then(response => response.blob())
            .then(blob => {
                setIsDownloading(false);
                setDownloadProgress(0);
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'video.mp4';
                document.body.appendChild(a);
                a.click();
                a.remove();
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <h2>Download Video</h2>
            <div>
                {props.quality}
                <button onClick={handleDownloadClick} disabled={isDownloading}>Download</button>
            </div>
            {isDownloading &&
                <div>
                    <p>Download progress: {downloadProgress.toFixed(2)}%</p>
                </div>
            }
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
