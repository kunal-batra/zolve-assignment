import React, { useState, useRef, useEffect } from "react";
import queryString from "query-string";
import './style.css'

const ClipBoard = () => {

    const [value, setValue] = useState('')

    const textInput = useRef()

    useEffect(() => {
        if (window && window.location && window.location.search) {
            const parsed = queryString.parse(window.location.search)
            if (parsed['q']) {
                setValue(parsed['q'])
            }
        }
    }, [])

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const copyText = () => {
        if (value) {
            textInput.current.select();
            document.execCommand("copy");
            setTimeout(() => {
                alert('text copied to clipboard')
            }, 10)
        }
    }

    return (
        <div className="copy-container">
            <div className="input-container">
                <input type="text" value={value} onChange={changeHandler} ref={textInput} />
                <button onClick={copyText}>Copy</button>
            </div>
            <div className="paste-container">
                <input type="text" placeholder="Paste your value here" />
            </div>
        </div>
    )
}

export default ClipBoard