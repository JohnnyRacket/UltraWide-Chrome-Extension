//weebs everywhere
var WebsiteInformation = WebsiteInformation || {};

console.log("kissanime script loaded");
function bloatVideo(width, height){
  setDefaults();
  WebsiteInformation.videoPlayer.style.height = height + "px"; // the 20 is for scrollbar
  WebsiteInformation.videoPlayer.style.width = width + "px";
  WebsiteInformation.videoPlayer.style.zIndex =  "999";

  movePage();

  console.log("video bloated");
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
