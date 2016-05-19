console.log("hello?");
function getCurrentScreen(){
  console.log("okay");
  chrome.windows.getCurrent(downsizeScreen);
}
function downsizeScreen(window){
  console.log("in downsizeScreen");
  windowId = window.id;
  console.log(window);

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
}

//activate on popup clicked
console.log("que pasa");
document.addEventListener('DOMContentLoaded', function() {
  console.log("que?");
  getCurrentScreen();
});
