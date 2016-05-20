var SystemInformation = SystemInformation || {};
SystemInformation.scrollBarWidth = 17; //seems to be standard and I cant find a way to calc it otf yet

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
//calulate the biggest 16:9 ratio possible later
//first start to find dom height
//then domHeight * 16/9 = desired dom width
//will have to add some to account for scroll bars and myabe other pixels
console.log("screen height is: " + SystemInformation.viewportHeight);
  SystemInformation.viewportWidth = Math.floor(((SystemInformation.viewportHeight) * 16/9)); //right now only supports landscape things... 17 is scrollbar size
  SystemInformation.browserWidth = SystemInformation.viewportWidth + SystemInformation.scrollBarWidth; // still nto sure why its scrollbar*2 and not just a single
  console.log("adjusted width = " + SystemInformation.viewportWidth);
  updateInfo = {
    left: SystemInformation.screenWidth - SystemInformation.browserWidth + 10, //dunno why its 10 pixels off yet
    top: 0,
    width: SystemInformation.browserWidth,
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
