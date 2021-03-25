async function loadScript(url) {
    return new Promise((resolve)=>{
        let scriptTag = document.createElement("script")
        scriptTag.src = url
        scriptTag.crossOrigin = "true"
        scriptTag.onload = ()=>resolve()
        document.head.appendChild(scriptTag)
    })
}

let currentScriptURL = document.currentScript.src.replace("/dev.js", "")
const REACT_DEV_URLS = ["https://unpkg.com/react@17/umd/react.development.js", "https://unpkg.com/react-dom@17/umd/react-dom.development.js", "https://unpkg.com/@reduxjs/toolkit/dist/redux-toolkit.umd.js"]
const REACT_URLS = ["https://unpkg.com/react@17/umd/react.production.min.js", "https://unpkg.com/react-dom@17/umd/react-dom.production.min.js", "https://unpkg.com/@reduxjs/toolkit/dist/redux-toolkit.umd.js"]

function isDevMode(module) {
    return module === window.localStorage.reactDevModule;
}

async function loadScript(url, id) {
    if(document.getElementById(id)) {
        return
    }
    console.debug("Loading react url", url, id)
    let scriptTag = document.createElement("script")
    scriptTag.src = url
    scriptTag.crossOrigin = "true"
    scriptTag.id = id
    scriptTag.async = false
    document.head.appendChild(scriptTag)
}

window.isLocalhost = window.location.hostname === "localhost"

let urls = window.isLocalhost ? REACT_DEV_URLS : REACT_URLS;
async function setup() {
    for (let index = 0; index < urls.length; index++) {
        let url = urls[index]
        await loadScript(url, `react_script_${index}`)
    }
}

window.reactModules = []
window.addReactModule = async (module, url)=>{
    reactModules.push({module, url})
    await setup()
    if(isDevMode(module)) {
        await loadScript("http://localhost:8080/bundle.js", `react_script_${module}`)
    } else {
        await loadScript(url, `react_script_${module}`)
    }
}

addReactModule("FoundryReactCore", `${currentScriptURL}/dist/bundle.js`)
