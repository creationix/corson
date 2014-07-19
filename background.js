"use strict";
var webRequest = window.chrome.webRequest;
var browserAction = window.chrome.browserAction;

var filter = {
  urls: ["<all_urls>"],
  types: ["xmlhttprequest", "other"]
};
var agent = "git/1.9.3";

var extraHeaders = [
  {
    name: "Access-Control-Allow-Origin",
    value: "*",
  },
  {
    name: "Access-Control-Allow-Methods",
    value: "POST, GET",
  },
  {
    name: "Access-Control-Allow-Headers",
    value: "Content-Type",
  }
];

browserAction.onClicked.addListener(function (tab) {
  setTab(tab.id);
});

function setTab(tabId) {
  browserAction.setBadgeText({
    text: "ON",
    tabId: tabId
  });
  filter.tabId = tabId;

  // Add CORS headers to responses so we can talk git cross-domain.
  // webRequest.onHeadersReceived.removeListener()
  webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, ["blocking", "responseHeaders"]);
  // // Change the agent to make bitbucket happy
  // webRequest.onBeforeSendHeaders.addListener(onBeforeSendHeaders, filter, ["blocking", "requestHeaders"]);
}

function onHeadersReceived(details) {
  var headers = details.requestHeaders;
  for (var i = 0; i < headers.length; i++) {

  }
  return {
    responseHeaders: details.responseHeaders.concat(extraHeaders)
  };
}

// function onBeforeSendHeaders(details) {
//   var headers = details.requestHeaders;
//   for (var i = 0; i < headers.length; i++) {
//     if (headers[i].name.toLowerCase() === 'user-agent') {
//       console.log("Changing User-Agent to " + agent);
//       headers[i].value = agent;
//       break;
//     }
//   }
//   return { requestHeaders: headers };
// }
