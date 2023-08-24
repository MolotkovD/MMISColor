
chrome.tabs.onActivated.addListener(async function (activeInfo) {
    await chrome.tabs.get(activeInfo.tabId, mainEvent)
});


chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    mainEvent(tab);
});


/**
 * @param {string} url 
 * @returns {boolean}
 */
function checkItUrl(url){
    return url.includes("https://mmis-web.rudn-sochi.ru/WebApp");
}

/**
 * @param {chrome.tab} tab The date
 * @param {string} myString The string
 */
function mainEvent(tab){
    chrome.action.disable(tab.id, ()=>{});
    chrome.action.setBadgeText({ text: "OFF", tabId: tab.id}, function () {});
    if (tab.status == "complete"){
        if (checkItUrl(tab.url)){
            chrome.action.enable(tab.id, ()=>{});
            chrome.action.setBadgeText({text: "", tabId: tab.id}, function () {});
            
        }
    }    
}

