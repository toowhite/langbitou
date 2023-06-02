'use strict';

// With background scripts you can communicate with popup
// and contentScript files.
// For more information on background script,
// See https://developer.chrome.com/extensions/background_pages

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'GREETINGS') {
    const message = `Hi ${
      sender.tab ? 'Con' : 'Pop'
    }, my name is Bac. I am from Background. It's great to hear from you.`;

    // Log message coming from the `request` parameter
    console.log(request.payload.message);
    // Send a response message
    sendResponse({
      message,
    });
  }
});

async function setSelectedTextBackgroundColor(tabUrl) {
  console.debug(tabUrl);

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
  
  const currentHighlights = await chrome.storage.local.get(tabUrl);
  if (!currentHighlights[tabUrl]) {
    currentHighlights[tabUrl] = [];
  }
  currentHighlights[tabUrl].push(selectionContents.textContent);
  
  chrome.storage.local.set({
    [tabUrl]: currentHighlights[tabUrl]
  });
}

chrome.commands.onCommand.addListener(async (command) => {
  if (command === "highlightTexts") {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setSelectedTextBackgroundColor,
      args: [tab.url],
    });
  }
});

