//weebs everywhere
console.log("kissanime script loaded");
function bloatVideo(width, height){
  console.log("bloating video, here i will need to access the page and modify the html!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  var videoPlayer = document.getElementById("my_video_1");
  videoPlayer.style.height = height + "px"; // the 20 is for scrollbar
  videoPlayer.style.width = width + "px";
  videoPlayer.style.zIndex =  "999";
  window.scroll(2000,0);
  location.href = "#";
  location.href = "#my_video_1";


  //document.body.scrollRight += 2000;
  console.log("video bloated");
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    bloatVideo(request.width, request.height);
    if (request.greeting == "hello"){
      sendResponse({farewell: "goodbye"});
    }
  });
