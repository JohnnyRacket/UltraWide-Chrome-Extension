var SystemInformation = SystemInformation || {};

function getViewportSize(tabs){
  SystemInformation.viewportHeight = tabs[0].height;
  chrome.system.display.getInfo(setScreenSize);
}

function setScreenSize(displayInfo){
  console.log("display info v");
  console.log(displayInfo);
  SystemInformation.screenHeight = displayInfo[0].bounds.height;
  SystemInformation.screenWidth = displayInfo[0].bounds.width;
  SystemInformation.browserHeight = displayInfo[0].workArea.height;
  SystemInformation.browserWidth = displayInfo[0].workArea.width;
  console.log("dssfsdfsd " + SystemInformation.screenHeight);
  getCurrentScreen();
}

function getCurrentScreen(){
  chrome.windows.getCurrent(downsizeScreen);
}

function downsizeScreen(window){
  console.log("in downsizeScreen");
  windowId = window.id;
  console.log(window);
//i need to replace this with a way to calulate the biggest 1080p ratio possible later
//first start to find dom height
//then domHeight * 16/9 = desired dom width
//will have to add some to account for scroll bars and myabe other pixels
console.log("screen height is: " + SystemInformation.viewportHeight);
  SystemInformation.viewportWidth = Math.ceil(SystemInformation.viewportHeight * 16/9); //right now only supports landscape things
  console.log("adjusted width = " + SystemInformation.viewportWidth);
  updateInfo = {
    left: SystemInformation.screenWidth - SystemInformation.viewportWidth + 10, //dunno why its 10 pixels off yet
    top: 0,
    width: SystemInformation.viewportWidth,
    height: SystemInformation.browserHeight + 10//, //right now its still 10 px off here as well
    //state: "fullscreen"
  }
  chrome.windows.update(windowId, updateInfo, notifyContentScript);
}
function notifyContentScript(height, width){
  console.log("blorping website: ");
  //for basic coding lets assume it checks that is is kissanime
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {height: SystemInformation.viewportHeight, width: SystemInformation.viewportWidth}, function(response) {
    console.log(response.farewell);
  });
});
}

//activate on popup clicked
document.addEventListener('DOMContentLoaded', function() {
  //set to max res
  var queryInfo = {
      active: true,
      currentWindow: true
    };
  chrome.tabs.query(queryInfo, getViewportSize);

});
