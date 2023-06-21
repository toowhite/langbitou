'use strict';

import "./print.css"

const setSelectedTextBackgroundColor = async () => {
  const url = location.href;

  const span = document.createElement("span");
  span.style.backgroundColor = "rgba(255,209,0,0.4)"; // Set background color to yellow
  span.style.borderRadius = "1em"; // Add rounded corners for a marker-like effect
  span.style.boxShadow = "0 0 2px 2px rgba(255,209,0,0.4)"; // Add a subtle shadow
  span.style.cursor = "pointer"; // Make the cursor more noticeable
  span.className = "langbitou-highlighted";

  let range;
  let selection = window.getSelection();
  if (selection.rangeCount > 0) {
    range = selection.getRangeAt(0);
  }
  else {
    const iframes = document.getElementsByTagName('iframe');
    for (let iframe of iframes) {
      const idoc = iframe.contentDocument;
      selection = idoc.getSelection();
      if (selection.rangeCount > 0) {
        range = selection.getRangeAt(0);
        break;
      }
    }
  }
  console.debug(selection);
  console.debug(range);

  const toBeHighlighted = range.extractContents().textContent;
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

  window.getSelection().removeAllRanges();
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
