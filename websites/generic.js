var WebsiteInformation = WebsiteInformation || {};
WebsiteInformation.videoPlayer = document.getElementsByTagName("video")[0];//this gets the html5 video

//resizes the generic video element, will still need the wrapper to be resized also in many cases
//generalizing this will let it work on some non-officialy supported sites
function resizeVideo(width, height){
  setDefaults();
  WebsiteInformation.videoPlayer.style.height = height + "px"; // the 20 is for scrollbar
  WebsiteInformation.videoPlayer.style.width = width + "px";
  WebsiteInformation.videoPlayer.id = "resizable_video"; //im really unsure right now if giving something a new id is okay. im gonna guess it isnt :)
  WebsiteInformation.videoPlayer.style.zIndex = 999;
}
function resizeWrapper(width, height){
  for (var i = 0; i < WebsiteInformation.resize.length; ++i) {
    var resize = WebsiteInformation.resize[i];
    resize.style.height = height + "px";
    resize.style.width = width + "px";
    resize.style.zIndex = 1000;
  }
}
//resizes controls that arent the video itself, these are defined in the specific website files
function bringForwardControls(){
  for (var i = 0; i < WebsiteInformation.bringForward.length; ++i) {
    var obj = WebsiteInformation.bringForward[i];
    // controls.style.height = height + "px";
    // controls.style.width = width + "px";
    obj.style.zIndex = 1000;
  }
}

//moves the page to our new page-sized video so that it is correctly centered
function movePage(){
  window.scroll(findPosX(WebsiteInformation.videoPlayer),0);
  location.href = "#";
  location.href = "#resizable_video";
  document.body.style.overflow = "hidden";
  window.scroll(findPosX(WebsiteInformation.videoPlayer),0);
  location.href = "#resizable_video"; //this is not graceful, but right now it has to exist unfortunately
}
//sets the default values for when you want to un-fullscreen
function setDefaults(){
  WebsiteInformation.videoPlayer.height = WebsiteInformation.videoPlayer.style.height;
  WebsiteInformation.videoPlayer.width = WebsiteInformation.videoPlayer.style.width;
  WebsiteInformation.videoPlayer.zIndex = WebsiteInformation.videoPlayer.style.zIndex;
}
//sets the video player back to deafult values
function restoreDefaults(){
  WebsiteInformation.videoPlayer.style.height = WebsiteInformation.videoPlayerHeight; // the 20 is for scrollbar
  WebsiteInformation.videoPlayer.style.width = WebsiteInformation.videoPlayerWidth;
  WebsiteInformation.videoPlayer.style.zIndex =  WebsiteInformation.videoPlayerzIndex ;

  //restore wrappers
  for (var i = 0; i < WebsiteInformation.resize.length; ++i) {
    var resize = WebsiteInformation.resize[i];
    resize.style.height = WebsiteInformation.videoPlayer.height + "px";
    resize.style.width = WebsiteInformation.videoPlayer.width + "px";
    resize.style.zIndex = WebsiteInformation.videoPlayer.zIndex + 1;
  }
  //push back things
  for (var i = 0; i < WebsiteInformation.bringForward.length; ++i) {
    var obj = WebsiteInformation.bringForward[i];
    obj.style.zIndex = WebsiteInformation.videoPlayer.zIndex + 1;
  }
  document.body.style.overflow = "visible";
}
//this is simply a listener for the message sent from the chrome extensions to make it fullscreen or not
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if(request.width !== 0 && request.height !== 0 ){
      resizeVideo(request.width, request.height);
      resizeWrapper(request.width, request.height);
      bringForwardControls();
      webpageSpecificHook(request.width, request.width);
      movePage();
    }else{
      restoreDefaults();
      webpageSpecificRestoreHook();
    }//callback sendResponse is not used currentl, but may be in the future
  }
);

//Finds position x value of given object, used so we can scroll the page adequately
function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
        } while (obj = obj.offsetParent);
    return [curleft];
    }
}
