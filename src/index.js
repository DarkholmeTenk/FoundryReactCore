import React from "react"
import DevSelector from "./dev/DevSelector";
import "./Hooks"
import "./Features"
import {SimpleReactApplication} from "./Util/ReactApplication.jsx";
export * as Util from "./Util"

function loadedStart() {
    if(window.isLocalhost) {
        let gameSettings = document.getElementById("settings-game")
        let newButton = document.createElement("button")
        newButton.innerText = "Change Dev Module"
        newButton.onclick = ()=>new SimpleReactApplication(<DevSelector />, {width:500, height: 700}).render(true)
        gameSettings.appendChild(newButton)
    }
}

Hooks.on("renderSettings", async()=>{
    setTimeout(()=>loadedStart(), 1)
})

export default {
    loaded: true
}