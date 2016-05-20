//weebs everywhere
var WebsiteInformation = WebsiteInformation || {};
WebsiteInformation.videoPlayer = document.getElementById("my_video_1");

console.log("kissanime script loaded");
function bloatVideo(width, height){
  setDefaults();
  console.log("bloating video, here i will need to access the page and modify the html!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  WebsiteInformation.videoPlayer.style.height = height + "px"; // the 20 is for scrollbar
  WebsiteInformation.videoPlayer.style.width = width + "px";
  WebsiteInformation.videoPlayer.style.zIndex =  "999";
  window.scroll(2000,0);
  location.href = "#";
  location.href = "#my_video_1";
  document.body.style.overflow = "hidden";

  //document.body.scrollRight += 2000;
  console.log("video bloated");
}
//gets the default values from the video player
function setDefaults(){
  WebsiteInformation.videoPlayerHeight = WebsiteInformation.videoPlayer.style.height;
  WebsiteInformation.videoPlayerWidth = WebsiteInformation.videoPlayer.style.width;
  WebsiteInformation.videoPlayerzIndex = WebsiteInformation.videoPlayer.style.zIndex;
}
//sets the video player back to deafult values
function restoreDefaults(){
  WebsiteInformation.videoPlayer.style.height = WebsiteInformation.videoPlayerHeight; // the 20 is for scrollbar
  WebsiteInformation.videoPlayer.style.width = WebsiteInformation.videoPlayerWidth;
  WebsiteInformation.videoPlayer.style.zIndex =  WebsiteInformation.videoPlayerzIndex ;
  document.body.style.overflow = "visible";
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if(request.width !== 0 && request.height !== 0 ){
      bloatVideo(request.width, request.height);
    }else{
      restoreDefaults();
    }
    if (request.greeting == "hello"){
      sendResponse({farewell: "goodbye"});
    }
  });
