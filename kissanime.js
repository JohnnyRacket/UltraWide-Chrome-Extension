//weebs everywhere
console.log("kissanime script loaded");
function bloatVideo(){
  console.log("bloating video, here i will need to access the page and modify the html!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  var videoPlayer = document.getElementById("my_video_1");
  videoPlayer.style.height = "920px";
  videoPlayer.style.width = "1650px";
  videoPlayer.style.zIndex =  "999";
  document.body.scrollRight += 2000;
  console.log("video bloated");
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    bloatVideo();
    if (request.greeting == "hello"){
      sendResponse({farewell: "goodbye"});
    }
  });
