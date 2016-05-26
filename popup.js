var SystemInformation = SystemInformation || {};
SystemInformation.scrollBarWidth = 17; //seems to be standard and I cant find a way to calc it otf yet

function getViewportSize(tabs){
  SystemInformation.viewportHeight = tabs[0].height;
  SystemInformation.viewportWidth = tabs[0].width;
}

function setScreenSize(displayInfo){
  SystemInformation.screenHeight = displayInfo[0].bounds.height;
  SystemInformation.screenWidth = displayInfo[0].bounds.width;
  SystemInformation.browserHeight = displayInfo[0].workArea.height;
  SystemInformation.browserWidth = displayInfo[0].workArea.width;
  alert(SystemInformation.browserWidth);

  getCurrentScreen();
}

function getCurrentScreen(){
  chrome.windows.getCurrent(resizeScreen);
}

function psuedoFullScreen(){
  notifyContentScript();
}
// black bullet hunterxhunter

function resizeScreen(window){
  windowId = window.id;
  console.log(window);
  //calulate the biggest 16:9 ratio possible later
  console.log("screen height is: " + SystemInformation.viewportHeight);
  SystemInformation.viewportWidth = Math.floor(((SystemInformation.viewportHeight) * 16/9)); //right now only supports landscape things
  SystemInformation.browserWidth = SystemInformation.viewportWidth + SystemInformation.scrollBarWidth; // still nto sure why its scrollbar*2 and not just a single
  console.log("adjusted width = " + SystemInformation.viewportWidth);
  updateInfo = {
    left: SystemInformation.screenWidth - SystemInformation.browserWidth + 10, //dunno why its 10 pixels off yet
    top: 0,
    width: SystemInformation.browserWidth,
    height: SystemInformation.browserHeight + 10//, //right now its still 10 px off here as well
    //state: "fullscreen"
  }
  chrome.windows.update(windowId, updateInfo);
}

function notifyContentScript(){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {height: SystemInformation.viewportHeight, width: SystemInformation.viewportWidth}, function(response) {
    console.log("response");
  });
});
}

//activate on popup clicked
document.addEventListener('DOMContentLoaded', function() {
  var queryInfo = {
      active: true,
      currentWindow: true
    };
  chrome.tabs.query(queryInfo, getViewportSize);
  var _selector = document.querySelector('input[type=checkbox]');
  chrome.storage.local.get('checked', function(items){
    if(items.checked){
      _selector.checked = items.checked;
    }
  });
   _selector.addEventListener('change', function (event) {
       if (_selector.checked) {
         chrome.storage.local.set({'checked': true});
         psuedoFullScreen();
       } else {
         chrome.storage.local.set({'checked': false});
         chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
           chrome.tabs.sendMessage(tabs[0].id, {height: 0, width: 0});
           // do something else otherwise
         });
       }
   });
  //set to max res
  var optButton = document.getElementById("optButton");
  optButton.addEventListener('click', function (event){
    chrome.system.display.getInfo(setScreenSize);
  });
});
