var WebsiteInformation = WebsiteInformation || {};
WebsiteInformation.videoPlayer = document.getElementsByTagName("video")[0];

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
      movePage();
    }else{
      restoreDefaults();
    }
    if (request.greeting == "hello"){
      sendResponse({farewell: "goodbye"});
    }
  }
);

//Finds x value of given object
function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
        } while (obj = obj.offsetParent);
    return [curleft];
    }
}
