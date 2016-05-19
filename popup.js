console.log("hello?");
function getCurrentScreen(){
  console.log("okay");
  chrome.windows.getCurrent(downsizeScreen);
}
function downsizeScreen(window){
  console.log("in downsizeScreen");
  windowId = window.id;
  console.log(window);
//i need to replace this with a way to calulate the biggest 1080p ratio possible later
  updateInfo = {
    left: 2560-1920 + 10,
    top: 0,
    width: 1920,
    height: 1050//,
    //state: "fullscreen"
  }

  chrome.windows.update(windowId, updateInfo, checkWebsite);
}
function checkWebsite(){
  console.log("blorping website");
  //for basic coding lets assume it checks that is is kissanime
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
});
}

//activate on popup clicked
console.log("que pasa");
document.addEventListener('DOMContentLoaded', function() {
  console.log("que?");
  getCurrentScreen();
});
