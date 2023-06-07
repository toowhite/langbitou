'use strict';

import "./print.css"

 const setSelectedTextBackgroundColor = async () => {
  const url = location.href;

  const span = document.createElement("span");
  span.style.backgroundColor = "chartreuse"; // Set background color to yellow
  // span.style.padding = "0.2em"; // Add padding for a marker-like effect
  span.style.borderRadius = "0.2em"; // Add rounded corners for a marker-like effect
  span.style.boxShadow = "0 0 2px 2px chartreuse"; // Add a subtle shadow
  span.className = "langbitou-highlighted";

  const range = window.getSelection().getRangeAt(0);
  var selectionContents = range.extractContents();
  console.debug(selectionContents.textContent);
  span.innerText = selectionContents.textContent;
  range.insertNode(span);
  
  const currentHighlights = await chrome.storage.local.get(url);
  if (!currentHighlights[url]) {
    currentHighlights[url] = [];
  }
  currentHighlights[url].push(selectionContents.textContent);
  
  chrome.storage.local.set({
    [url]: currentHighlights[url]
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.debug(message);

  if (message.command === "HIGHLIGHT_TEXTS") {
    setSelectedTextBackgroundColor();
  }

  sendResponse({});
  return true;
});

(async () => {
  const highlights = await chrome.storage.local.get(location.href);
  if (highlights[location.href]) {
    // alert("You have visited this page before.");
    const readMark = document.createElement("img");
    readMark.src = chrome.runtime.getURL("icons/paper-clips.png");
    readMark.style.position = "absolute";
    readMark.title = "click here to load previous highlights";
    readMark.style.top = "0";
    readMark.style.right = "0";
    readMark.style.cursor = "pointer";

    document.body.appendChild(readMark);
  }
})();
