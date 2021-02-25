import ReactDOM from "react-dom"
import TestComponent from "../TestComponent";
import AppContext from "./AppContext";

export default class ReactApplication extends Application {

    constructor(...args) {
        super(...args)
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "modules/FoundryReactCore/src/Util/ReactApplication.hbs"
        })
    }

    getComponent() {
        throw Error("No component defined!")
    }

    getData(options) {
        return {id: this.appId};
    }

    async _render(...args) {
        await super._render(...args);
        let component = await this.getComponent()
        let context = AppContext
        ReactDOM.render(<context.Provider value={this}>{component}</context.Provider>, document.getElementById(`react-${this.appId}`))
    }
}

export class SimpleReactApplication extends ReactApplication {
    constructor(reactComponent, ...args) {
        super(...args)
        this.reactComponent = reactComponent
    }

    getComponent() {
        return this.reactComponent
    }
}