import ReactDOM from "react-dom"
import TestComponent from "../TestComponent";

export default class ReactApplication extends Application {

    constructor(reactComponent, ...args) {
        super(...args)
        this.reactComponent = reactComponent
    }

    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            template: "modules/FoundryReactCore/src/util/ReactApplication.hbs"
        })
    }

    getComponent() {
        return this.reactComponent
    }

    getData(options) {
        return {id: this.appId};
    }

    async _render(...args) {
        await super._render(...args);
        ReactDOM.render(this.getComponent(), document.getElementById(`react-${this.appId}`))
    }
}