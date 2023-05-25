let nextPageToken = "";

function getVideos(){
    fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCRDKjJOuoxK6pOSvZPI6Y8Q&maxResults=10&order=date&key=AIzaSyD5gtH7gegedWAWOiHdrKI7ekO6n76FR2s" + nextPageToken)
    .then((result)=>{   
        return result.json()
    }).then((data)=>{
        console.log(data);
        let videos = data.items;
        nextPageToken = data.nextPageToken;
        console.log(data.nextPageToken);
        let videoContainer = document.querySelector(".youtube_container");
        for(video of videos){
            videoContainer.innerHTML += `
                <h3>${video.snippet.title}</h3>
                 <img src="${video.snippet.thumbnails.high.url}" data-video-id="${video.id.videoId}">
            `;
        }
    })
   
}

getVideos();