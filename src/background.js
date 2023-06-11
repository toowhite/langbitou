'use strict';

chrome.commands.onCommand.addListener(async (command) => {
  console.debug('HIGHLIGHT_TEXTS');
  if (command === 'HIGHLIGHT_TEXTS') {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.tabs.sendMessage(tab.id, {
      command: 'HIGHLIGHT_TEXTS',
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "ctmHighlight",
    title: "Highlight",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  // console.debug(tab);
  if (info.menuItemId === "ctmHighlight") {
    chrome.tabs.sendMessage(tab.id, {
      command: "HIGHLIGHT_TEXTS",
    });
  }
});
