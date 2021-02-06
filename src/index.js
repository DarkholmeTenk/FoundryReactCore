import React from "react"
import ReactApplication from "./util/ReactApplication";
import DevSelector from "./dev/DevSelector";
export ReactApplication from "./util/ReactApplication";

function loadedStart() {
    if(window.isLocalhost) {
        let gameSettings = document.getElementById("settings-game")
        let newButton = document.createElement("button")
        newButton.innerText = "Change Dev Module"
        newButton.onclick = ()=>new ReactApplication(<DevSelector />, {width:500, height: 700}).render(true)
        gameSettings.appendChild(newButton)
    }
}

Hooks.on("renderSettings", async()=>{
    setTimeout(()=>loadedStart(), 1)

})

export default {
    loaded: true
}