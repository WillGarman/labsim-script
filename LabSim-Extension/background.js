console.log("Starting Listener background.js");

chrome.webRequest.onBeforeRequest.addListener(function(details) {
    console.log(details)
    if (details && details.url && details.url.includes("encoded?")) {
      // Once the request is found, trigger the content script
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log("Request found!");
        chrome.tabs.sendMessage(tabs[0].id, {data: "hi"}); //trigger the content script
      });
    }
  }, {urls: ["https://labsimapi.testout.com/*"]}, ["blocking"]);