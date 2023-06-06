'use strict';

chrome.commands.onCommand.addListener(async (command) => {
  console.debug('HIGHLIGHT_TEXTS');
  if (command === 'HIGHLIGHT_TEXTS') {
    const [tab] = await chrome.tabs.query({
      active: true,
      currentWindow: true,
    });
    chrome.tabs.sendMessage(tab.id, {
      command: command,
    });
  }
});
