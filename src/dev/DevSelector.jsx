import {useState} from "react"
import Styles from "./DevSelector.module.scss"

export default function DevSelector() {
    let [devModule, setDevModule] = useState(window.localStorage.reactDevModule)
    let updateDevModule = (newModule)=>{
        window.localStorage.reactDevModule = newModule
        setDevModule(newModule)
    }

    return <div className={Styles.container}>
        {window.reactModules.map(({module, url})=>{
            let isDev = module === devModule
            let set = (e)=>{
                let v = e.target.checked
                if(isDev && !v) {
                    updateDevModule(null)
                } else {
                    updateDevModule(module)
                }
            }
            return <div>
                <input type="checkbox" checked={isDev} onChange={set} />
                <span>{module}</span> - <span className={Styles.url}>{url}</span>
            </div>
        })}
    </div>
}