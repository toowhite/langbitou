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
  const toBeHighlighted = selectionContents.textContent;
  span.innerText = toBeHighlighted;
  range.insertNode(span);
  
  const curHighlights = await chrome.storage.local.get(url);
  if (!curHighlights[url]) {
    curHighlights[url] = [];
  }
  curHighlights[url].push(toBeHighlighted);
  
  chrome.storage.local.set({
    [url]: curHighlights[url]
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.command === "HIGHLIGHT_TEXTS") {
    setSelectedTextBackgroundColor();
  }

  sendResponse({});
  return true;
});

(async () => {
  const highlights = await chrome.storage.local.get(location.href);
  console.debug(highlights);
})();
