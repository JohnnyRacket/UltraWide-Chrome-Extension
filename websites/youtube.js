var WebsiteInformation = WebsiteInformation || {};
//WebsiteInformation.videoPlayer = document.getElementsByClassName("player-api")[0];
WebsiteInformation.resize = new Array( document.getElementsByClassName("player-api")[0] );
WebsiteInformation.bringForward = new Array( document.getElementsByClassName("ytp-chrome-bottom")[0] );

function webpageSpecificHook(width, height){
  document.getElementsByClassName("ytp-chrome-bottom")[0].style.width = (width - 24) + "px";
  document.getElementById("masthead-positioner").style.visibility = "hidden";
}

function webpageSpecificRestoreHook(){
  document.getElementsByClassName("ytp-chrome-bottom")[0].style.width = (WebsiteInformation.videoPlayer.width - 24) + "px";
  document.getElementById("masthead-positioner").style.visibility = "visible";
}
//ytp-chrome-bottom for bottom bar
//video object or video-stream html5-main-video classes for the video itself
