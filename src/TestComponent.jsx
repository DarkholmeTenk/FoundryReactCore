import {useState} from "react";

function TestComponent({}) {
    let [counter, setCounter] = useState(0)
    return (<div>
        Here is some react {counter}
        <footer className="form-footer">
            <button onClick={()=>setCounter((prev)=>prev + 1)}>
                Increment
            </button>
        </footer>
    </div>);
}

export default TestComponent