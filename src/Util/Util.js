import ReactDOM from "react-dom"

let count = 0;

export function createReactElement(parentContainer, reactComponent) {
    let div = document.createElement("div")
    div.id = `react-element-${count++}`
    parentContainer.appendChild(div)
    ReactDOM.render(reactComponent, div)
}

export function randomIndex(array) {
    return Math.floor(Math.random() * array.length)
}

export function isEqual(a, b, ignore = {}) {
    if(typeof(a) !== typeof(b)) return false
    if(a === b) return true
    if(a === null || a === undefined) { return b === null || b === undefined }
    let aEqual = Object.keys(a).every(key=>{
        if(ignore[key] === true) { return true }
        let aVal = a[key]
        let bVal = b[key]
        if(typeof(aVal) !== typeof(bVal)) {
            return false
        } else if(typeof(aVal) === "object") {
            return isEqual(aVal, bVal, ignore[key] || {})
        } else {
            return aVal == bVal
        }
    })
    let bNewKey = Object.keys(b).some(key=>!(ignore[key] === true) && !(key in a))
    return aEqual && !bNewKey
}

export function clone(i) {
    if(i !== null) {
        if(Array.isArray(i)) {
            return i.map(i=>clone(i))
        } else if(typeof(i) === "object") {
            let newObj = {}
            Object.keys(i).forEach(key=>{
                newObj[key] = clone(i[key])
            })
            return newObj
        } else {
            return i
        }
    }
}