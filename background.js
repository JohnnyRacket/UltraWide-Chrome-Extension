//this file isnt used yet, but will be used to implement commands
console.log('bloop');
chrome.commands.onCommand.addListener(function(command) {
  console.log('blip');
  console.log('onCommand event received for message: ', command);
});
