import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Header = () => {
    return (
        <div className="header">
            <div className="header-item">
                <Link to="/">Bar Chart</Link>
            </div>
            <div className="header-item">
                <Link to="/copy-to-clipboard">Copy To Clipboard</Link>
            </div>
        </div>
    )
}

export default Header