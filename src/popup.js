'use strict';

import "./popup.css"

(async () => {
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
  const highlights = await chrome.storage.local.get(tab.url);

  const btnClear = document.getElementById("btnClear");
  btnClear.addEventListener("click", (element, event) => {
    chrome.storage.local.remove(tab.url);
    window.close();
  });

  const ol = document.getElementById("highlights-texts");
  if (highlights[tab.url])  {
    for (const highlight of highlights[tab.url]) {
      const li = document.createElement("li");
      li.innerText = highlight.trim();
      ol.appendChild(li);
    }
  }
})();
