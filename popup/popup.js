
const listParams = [
    "--v-stud-base",
    "--v-stud-lighten5",
    "--v-stud-lighten4",
    "--v-stud-lighten3",
    "--v-stud-lighten2",
    "--v-stud-lighten1"
]

document.addEventListener("DOMContentLoaded", LoadAllSaves);

function LoadAllSaves(_) {
    for (let index = 0; index < listParams.length; index++) {
        var input = document.getElementById(listParams[index])
        let request = [listParams[index]]
        input.addEventListener("input", inputChenge);
        chrome.storage.local.get(request).then((res) => {
            var res = Object.values(res)[0]
            if (typeof res == "undefined"){document.getElementById(listParams[index]).value = "#000000"}
            else {document.getElementById(listParams[index]).value = res}
             
            
        });
    }
}

/**
 * 
 * @param {string} namePara 
 * @param {string} value 
 */
function setSave(namePara, value) { chrome.storage.local.set({ [namePara]: value }); }


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
    
async function getTabId(){
    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if (typeof tab == "undefined"){ return 0}
    return tab.id;
}

async function inputChenge(input) {
    var input = input.target;
    setSave(input.id, input.value)
    chrome.scripting
    .executeScript({
      target : {tabId : await getTabId()},
      func: addStyle,
      args: [input.id, input.value]
    })
}
