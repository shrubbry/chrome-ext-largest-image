function activateExtension(tabId) {
    chrome.tabs.sendMessage(tabId, { action: 'getLargestImage' });
  }
  
  function activateAllTabsRightHotkey(currentTab) {
    chrome.tabs.query({ currentWindow: true }, function (allTabs) {
      var startIndex = allTabs.findIndex(tab => tab.id === currentTab.id);
      for (var i = startIndex + 1; i < allTabs.length; i++) {
        activateExtension(allTabs[i].id);
      }
    });
  }
  
  chrome.commands.onCommand.addListener(function (command) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
      var currentTab = tabs[0];
      if (command === 'activateExtension') {
        activateExtension(currentTab.id);
      } else if (command === 'activateAllTabsRightHotkey') {
        activateAllTabsRightHotkey(currentTab);
      }
    });
  });
  
  chrome.action.onClicked.addListener(function (tab) {
    activateExtension(tab.id);
  });
  
  // Create context menu items
  chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      id: 'activateExtension',
      title: 'Activate Extension on This Tab',
      contexts: ['page', 'image'],
    });
  
    chrome.contextMenus.create({
      id: 'activateAllTabsRightHotkey',
      title: 'Activate Extension on All Tabs to the Right',
      contexts: ['page'],
    });
  });
  
  // Add context menu click event listener
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === 'activateExtension') {
      activateExtension(tab.id);
    } else if (info.menuItemId === 'activateAllTabsRightHotkey') {
      activateAllTabsRightHotkey(tab);
    }
  });
  