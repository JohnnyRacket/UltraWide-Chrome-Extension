var WebsiteInformation = WebsiteInformation || {};
WebsiteInformation.videoPlayer = document.getElementsByClassName("player-api")[0];

function bloatVideo(width, height){
  setDefaults();
  WebsiteInformation.videoPlayer.style.height = height + "px"; // the 20 is for scrollbar
  WebsiteInformation.videoPlayer.style.width = width + "px";
  WebsiteInformation.videoPlayer.style.zIndex =  "999";
  WebsiteInformation.videoPlayer.id = "my_video_1";
  movePage();

}

function movePage(){
  //alert(findPosX(WebsiteInformation.videoPlayer));
  window.scroll(findPosX(WebsiteInformation.videoPlayer),0);
  location.href = "#";
  location.href = "#my_video_1";
  document.body.style.overflow = "hidden";
  //alert(findPosX(WebsiteInformation.videoPlayer));
  window.scroll(findPosX(WebsiteInformation.videoPlayer),0);
  location.href = "#my_video_1"; //this is not graceful, but right now it has to exist unfortunately
}

//ytp-chrome-bottom for bottom bar
//video object or video-stream html5-main-video classes for the video itself
