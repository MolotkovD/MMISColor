var tabID
const listParams = [
    "--v-stud-base",
"--v-stud-lighten5",
"--v-stud-lighten4",
"--v-stud-lighten3",
"--v-stud-lighten2",
"--v-stud-lighten1"
]
const MMIS_ORIGIN = 'https://mmis-web.rudn-sochi.ru/';

  


async function getTabId(){
    if (tabID == null){
        let [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });
        tabID = tab.id
        return [tab]
    }
    
}



document.addEventListener("DOMContentLoaded", (ev)=>{
    for (let index = 0; index < listParams.length; index++) {
        document.getElementById(listParams[index]).addEventListener("input", inputChenge);
        setSaveValue(listParams[index])
    }
})

function SaveValue(namePara, value) {
    chrome.storage.local.set({ [namePara] : value }).then(() => {
        console.log("Value is set");
      });      
}

function setSaveValue(namePara) {
    chrome.storage.local.get([namePara]).then((result) => {
        if (result[namePara]){
            document.getElementById(namePara).value = result[namePara];
        
    }
    });
}

function addStyle(id, value){
    var reale_styles = document.getElementsByClassName(id)
    for (let id = 0; id < reale_styles.length; id++) {
        var element = reale_styles[id];
        document.head.removeChild(element)
    }


    var style = document.createElement("style")
    style.className = id
    style.innerHTML = ":root{" + id + ":" + value + ";}"
    document.head.appendChild(style)
}

async function inputChenge(input){
    var input = input.target;
    SaveValue(input.id, input.value)
    if (tabID == null){
        let [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });
        tabID = tab.id
    }
    chrome.scripting
        .executeScript({
            target : {tabId : tabID},
            func : addStyle,
            args : [ input.id, input.value ]
    })

}

