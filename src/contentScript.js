'use strict';

(async () => {
  const highlights = await chrome.storage.local.get(location.href);
  console.debug(highlights);
})();
