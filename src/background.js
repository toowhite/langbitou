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

// https://stackoverflow.com/questions/66618136/persistent-service-worker-in-chrome-extension/66618269#66618269
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();
