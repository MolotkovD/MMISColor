const listParams = [
    "--v-stud-base",
    "--v-stud-lighten5",
    "--v-stud-lighten4",
    "--v-stud-lighten3",
    "--v-stud-lighten2",
    "--v-stud-lighten1"
]

function setup(){
    for (let index = 0; index < listParams.length; index++) {
        
        let element = listParams[index];
        let request = [element];
        chrome.storage.local.get(request).then((res) => { 
            addStyle(listParams[index], Object.values(res)[0])
        });
        

    }
    
}

function getId() {
    let res = chrome.tabs.getCurrent( function(tab) {
        return tab.id
    })
    return res
}


async function addStyle(id, value){
    let reale_styles = document.getElementsByClassName(id)
    for (let id_ = 0; id_ < reale_styles.length; id_++) {
        var element = reale_styles[id_];
        document.head.removeChild(element)
    }
    var style = document.createElement("style")
    style.className = id
    style.innerHTML = ":root{" + id + ":" + value + ";}"
    document.head.appendChild(style)
}
setup();